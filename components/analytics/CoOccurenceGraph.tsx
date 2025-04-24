import { Contact, Tag } from "../../utils/types";
import {
  Dimensions,
  findNodeHandle,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";
import {
  Canvas,
  Circle,
  Group,
  Line,
  Text,
  useFont,
  vec,
  SkFont,
  Skia,
} from "@shopify/react-native-skia";
import { useEffect, useMemo, useRef, useState } from "react";
import CommonModal from "../profile screen/CommonModal";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runForceLayout } from "./ForceLayout";

type Props = {
  contacts: Contact[];
  tags: Tag[];
};

export default function CoOccurrenceGraph({ contacts, tags }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const width = Dimensions.get("window").width * 0.8;
  const height = Dimensions.get("window").height * 0.8;
  const font = useFont(require("../../assets/fonts/Poppins-Medium.ttf"), 11);

  // memoize the small/preview graph
  const smallGraph = useMemo(
    () =>
      font
        ? drawCoOccurrenceGraph(contacts, width, /* canvasHeight= */ 300, font)
        : null,
    // only recompute if contacts, width, 300 or font change:
    [contacts, width, font]
  );

  // memoize the full-screen graph
  const modalGraph = useMemo(
    () => (font ? drawCoOccurrenceGraph(contacts, width, height, font) : null),
    [contacts, width, height, font]
  );

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const lastPanX = useSharedValue(0);
  const lastPanY = useSharedValue(0);
  const lastScale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const transform = useDerivedValue(() => [
    { translateX: translateX.value },
    { translateY: translateY.value },
    { scale: scale.value },
  ]);

  const pan = Gesture.Pan()
    .onStart(() => {
      lastPanX.value = translateX.value;
      lastPanY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = lastPanX.value + e.translationX;
      translateY.value = lastPanY.value + e.translationY;
    });

  const canvasRef = useRef(null);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  // ➋ measure on mount (or whenever the modal opens)
  useEffect(() => {
    const node = findNodeHandle(canvasRef.current);
    if (node) {
      UIManager.measure(
        node,
        (_fx, _fy, _w, _h, pageX: number, pageY: number) => {
          setCanvasOffset({ x: pageX, y: pageY });
        }
      );
    }
  }, [isModalVisible]); // remap every time you show it

  // ➌ pinch that subtracts that offset
  const pinch = Gesture.Pinch()
    .onStart((e) => {
      lastScale.value = scale.value;
      // raw focal in canvas coords
      const lx = e.focalX - canvasOffset.x;
      const ly = e.focalY - canvasOffset.y;
      // normalize into content space
      focalX.value = (lx - translateX.value) / scale.value;
      focalY.value = (ly - translateY.value) / scale.value;
    })
    .onUpdate((e) => {
      const newScale = lastScale.value * e.scale;
      scale.value = newScale;
      // re-project that same normalized point back to the new scale
      const lx = e.focalX - canvasOffset.x;
      const ly = e.focalY - canvasOffset.y;
      translateX.value = lx - focalX.value * newScale;
      translateY.value = ly - focalY.value * newScale;
    });

  // (if you still want pan, compose as Race or Exclusive)

  const onModalClose = () => {
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    lastPanX.value = 0;
    lastPanY.value = 0;
    lastScale.value = 1;
    focalX.value = 0;
    focalY.value = 0;
    setIsModalVisible(false);
  };
  const composed = Gesture.Race(pinch, pan);
  return (
    <>
      {!isModalVisible && (
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(true)}>
          <View>
            <Canvas style={{ width, height: 300 }}>
              <Group>{smallGraph}</Group>
            </Canvas>
          </View>
        </TouchableWithoutFeedback>
      )}

      {isModalVisible && (
        <CommonModal
          isVisible
          heightProportion={0.8}
          centered
          onClose={() => {
            // reset transforms…
            setIsModalVisible(false);
          }}
        >
          <GestureDetector gesture={composed}>
            <Canvas ref={canvasRef} style={{ width, height }}>
              <Group transform={transform}>{modalGraph}</Group>
            </Canvas>
          </GestureDetector>
        </CommonModal>
      )}
    </>
  );
}

// node is a contact
// count is the number of edges they have (number of people that share a tag with them)
type Node = {
  id: String;
  name: String;
  count: number;
};

// edge is a shared tag between the contacts
//
type Edge = {
  source: Node;
  target: Node;
  weight: number;
};

function drawCoOccurrenceGraph(
  contacts: Contact[],
  width: number,
  height: number,
  font: SkFont
) {
  const { nodes, edges } = buildCoOccurrenceGraphData(contacts);
  if (!nodes.length) return null;

  /* ---------- 1. node sizing (same as before) ------------------ */
  const maxCnt = Math.max(...nodes.map((n) => n.count));
  const minR = 16;
  const maxR = 40;
  nodes.forEach((n) => {
    (n as any).r = minR + ((maxR - minR) * n.count) / (maxCnt || 1);
  });

  /* ---------- 2. let the force engine decide x / y ------------- */
  runForceLayout(nodes as any, edges as any, width, height);

  /* ---------- 3. render --------------------------------------- */
  const elements: React.ReactNode[] = [];

  edges.forEach((e, i) => {
    const s = e.source as any;
    const t = e.target as any;
    elements.push(
      <Line
        key={`edge-${i}`}
        p1={vec(s.x, s.y)}
        p2={vec(t.x, t.y)}
        strokeWidth={1 + Math.log2(e.weight)}
        color="#94a3b8"
      />
    );
  });

  nodes.forEach((n, i) => {
    const { x, y, r } = n as any;
    elements.push(
      <Circle key={`node-${i}`} cx={x} cy={y} r={r} color="#3b82f6" />
    );

    const label = String(n.name.split(" ")[0]);
    const sizedFont = Skia.Font(font.getTypeface() || undefined, r * 0.4);
    const w = sizedFont.measureText(label).width;
    const { ascent, descent } = sizedFont.getMetrics();
    const baselineY = y + (descent - ascent) / 2 - descent;

    elements.push(
      <Text
        key={`label-${i}`}
        x={x - w / 2}
        y={baselineY}
        text={label}
        font={sizedFont}
        color="white"
      />
    );
  });

  return elements;
}

function buildCoOccurrenceGraphData(contacts: Contact[]): {
  nodes: Node[];
  edges: Edge[];
} {
  // 1. init nodes with count = 0
  const nodesMap = new Map<string, Node>();
  for (const c of contacts) {
    nodesMap.set(c.id, {
      id: c.id,
      name: c.name,
      count: 0, // reset count
    });
  }

  // 2. bucket contacts by tag
  const tagBuckets = new Map<string, string[]>();
  for (const { id, tags } of contacts) {
    for (const tag of tags) {
      (tagBuckets.get(tag) ?? tagBuckets.set(tag, []).get(tag)!).push(id);
    }
  }

  // 3. build unique edges and track weights
  const edgesMap = new Map<string, Edge>();
  for (const ids of tagBuckets.values()) {
    for (let i = 0; i < ids.length - 1; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const [a, b] = ids[i] < ids[j] ? [ids[i], ids[j]] : [ids[j], ids[i]];
        const key = `${a}|${b}`;

        if (!edgesMap.has(key)) {
          edgesMap.set(key, {
            source: nodesMap.get(a)!,
            target: nodesMap.get(b)!,
            weight: 1,
          });
        } else {
          edgesMap.get(key)!.weight += 1;
        }
      }
    }
  }

  // 4. set each node.count = number of incident edges
  for (const edge of edgesMap.values()) {
    edge.source.count += 1;
    edge.target.count += 1;
  }

  return {
    nodes: Array.from(nodesMap.values()),
    edges: Array.from(edgesMap.values()),
  };
}
