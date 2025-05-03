import { Contact, Tag } from "../../utils/types";
import {
  Dimensions,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from "react-native";
import {
  Canvas,
  Circle,
  Group,
  Line,
  Text as SkiaText,
  useFont,
  vec,
  SkFont,
  RadialGradient,
  Path1DPathEffect,
} from "@shopify/react-native-skia";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import CommonModal from "../profile screen/CommonModal";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Slider from "@react-native-community/slider";
import { runForceLayout } from "./ForceLayout";
import CommonText from "../CommonText";
import getTheme from "../../utils/GetTheme";
import { BlurView } from "expo-blur";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/** Visual node rendered in the graph */
export type Node = { id: string; name: string; count: number };
/** Edge connecting two nodes */
export type Edge = { source: Node; target: Node; weight: number };
/** Axis‑aligned bounding box */
export type Bounds = { minX: number; minY: number; maxX: number; maxY: number };
/** Result returned by the draw routine */
export type GraphResult = { elements: React.ReactNode[]; bounds: Bounds };
/** Component props */
export type Props = { contacts: Contact[]; tags: Tag[] };

/* -------------------------------------------------------------------------- */
/*                                 Constants                                  */
/* -------------------------------------------------------------------------- */

const SMALL_HEIGHT = 300; // thumbnail canvas height
const PADDING = 20; // inner padding when fitting
const FONT_PATH = require("../../assets/fonts/Poppins-Medium.ttf");

/* -------------------------------------------------------------------------- */
/*                               Main Component                               */
/* -------------------------------------------------------------------------- */

export default function CoOccurrenceGraph({ contacts }: Props) {
  /* ───── theme & fonts ─────────────────────────────────────────────────── */
  const theme = getTheme();
  const font = useFont(FONT_PATH, 11);

  /* ───── dimensions ────────────────────────────────────────────────────── */
  const width = Dimensions.get("window").width * 0.8;
  const height = Dimensions.get("window").height * 0.8;

  /* ───── data‑driven upper bound for the slider ────────────────────────── */
  const maxEdgeWeight = useMaxEdgeWeight(contacts);

  /* ───── UI state ──────────────────────────────────────────────────────── */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minEdgeWeight, setMinEdgeWeight] = useState(
    Math.ceil(maxEdgeWeight / 2)
  );

  /* Keep slider value within the valid range when contacts change */
  useEffect(() => {
    if (minEdgeWeight > maxEdgeWeight) setMinEdgeWeight(maxEdgeWeight);
  }, [maxEdgeWeight, minEdgeWeight]);

  /* ───── heavy graph computation (runs on a background frame) ──────────── */
  const { graph, loading } = useGraph(
    contacts,
    width,
    height,
    font,
    minEdgeWeight,
    theme
  );

  /* ───── transforms (static & animated) ────────────────────────────────── */
  const { fitTransform, centerTransform } = useTransforms(
    graph,
    width,
    height,
    isModalVisible,
    maxEdgeWeight //  ← new arg
  );

  const { gesture, animTransform, resetTransforms } = usePanZoom();

  const onModalClose = () => {
    resetTransforms();
    setIsModalVisible(false);
  };
  if (!loading && !graph?.elements)
    return (
      <View
        style={{
          width,
          height: SMALL_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.name === "dark" ? "#121212" : "#f5f4f2",
          borderRadius: 20,
        }}
      >
        <CommonText size="xsmall">Not enought data.</CommonText>
        <CommonText size="xsmall">Tag more contacts</CommonText>
      </View>
    );
  return (
    <>
      {/* ─────────── thumbnail view ─────────── */}
      {!isModalVisible && (
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(true)}>
          <View
            style={{
              width,
              height: SMALL_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.name === "dark" ? "#121212" : "#f5f4f2",
              borderRadius: 20,
            }}
          >
            {loading || !graph ? (
              <ActivityIndicator size="large" color={theme.text.semi} />
            ) : (
              <Canvas style={{ width, height: SMALL_HEIGHT }}>
                <Group transform={fitTransform}>{graph.elements}</Group>
              </Canvas>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* ─────────── modal view ─────────── */}
      {isModalVisible && (
        <CommonModal
          isVisible
          heightProportion={0.8}
          centered
          onClose={onModalClose}
        >
          {/* threshold slider */}
          <BlurView
            intensity={25}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 30,
              padding: 5,
              zIndex: 3,
            }}
          >
            <CommonText style={{ zIndex: 3 }}>
              Similarity Level: {minEdgeWeight}
            </CommonText>
            <Slider
              style={{ width: "90%", height: 40 }}
              minimumValue={1}
              maximumValue={maxEdgeWeight}
              step={1}
              value={minEdgeWeight}
              onValueChange={setMinEdgeWeight}
              minimumTrackTintColor="#b33ffb"
              thumbTintColor="#b33ffb"
            />
          </BlurView>

          <GestureDetector gesture={gesture}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading || !graph ? (
                <ActivityIndicator size="large" color={theme.text.semi} />
              ) : (
                <Canvas style={{ width, height }}>
                  <Group transform={centerTransform}>
                    <Group
                      origin={{ x: width / 2, y: height / 2 }}
                      transform={animTransform}
                    >
                      {graph.elements}
                    </Group>
                  </Group>
                </Canvas>
              )}
            </View>
          </GestureDetector>
        </CommonModal>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Custom   Hooks                                */
/* -------------------------------------------------------------------------- */

/** Compute the maximum edge weight present in the data. */
function useMaxEdgeWeight(contacts: Contact[]) {
  return useMemo(() => {
    const { edges } = buildCoOccurrenceGraphData(contacts);
    return edges.length ? Math.max(...edges.map((e) => e.weight)) : 1;
  }, [contacts]);
}

/** Heavy graph drawing logic wrapped in a hook */
function useGraph(
  contacts: Contact[],
  width: number,
  height: number,
  font: SkFont | null,
  minEdgeWeight: number,
  theme: any
) {
  const [graph, setGraph] = useState<GraphResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!font) return;
    setLoading(true);

    // Execute on next frame to keep UI responsive
    requestAnimationFrame(() => {
      const res = drawCoOccurrenceGraph(
        contacts,
        width,
        height,
        font,
        minEdgeWeight,
        theme
      );
      setGraph(res);
      setLoading(false);
    });
  }, [contacts, width, height, font, minEdgeWeight, theme]);

  return { graph, loading } as const;
}

/** Compute static transforms for the thumbnail & modal modes */
function useTransforms(
  graph: GraphResult | null,
  width: number,
  height: number,
  isModalVisible: boolean,
  maxEdgeWeight: number
) {
  const fitTransform = useMemo(() => {
    if (!graph) return [{ scale: 1 }];
    const { bounds } = graph;
    const gW = bounds.maxX - bounds.minX;
    const gH = bounds.maxY - bounds.minY;
    function clamp(n: number, lo: number, hi: number) {
      return Math.min(Math.max(n, lo), hi);
    }
    const scale = clamp(
      Math.min((width - 2 * PADDING) / gW, (SMALL_HEIGHT - 2 * PADDING) / gH),
      0.5,
      2
    );

    const h = isModalVisible ? height : SMALL_HEIGHT;
    const tx = (width - gW * scale) / 2 - bounds.minX * scale;
    const ty = (h - gH * scale) / 2 - bounds.minY * scale;
    return [{ translateX: tx }, { translateY: ty }, { scale }];
  }, [graph, width, height, isModalVisible, maxEdgeWeight]);

  const centerTransform = useMemo(() => {
    if (!graph) return [{ scale: 1 }];
    const { bounds } = graph;
    const gW = bounds.maxX - bounds.minX;
    const gH = bounds.maxY - bounds.minY;

    const h = isModalVisible ? height : SMALL_HEIGHT;
    const tx = (width - gW) / 2 - bounds.minX;
    const ty = (h - gH) / 2 - bounds.minY;

    return [{ translateX: tx }, { translateY: ty }];
  }, [graph, width, height, isModalVisible, maxEdgeWeight]);

  return { fitTransform, centerTransform } as const;
}

/** Pan + pinch‑zoom gesture plumbing extracted into its own hook */
/** Pan + pinch-zoom gesture */
function usePanZoom() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const lastPanX = useSharedValue(0);
  const lastPanY = useSharedValue(0);
  const lastScale = useSharedValue(1);

  /* ----- animated matrix (scale first, then translate) ----- */
  const animTransform = useDerivedValue(() => [
    { scale: scale.value },
    { translateX: translateX.value },
    { translateY: translateY.value },
  ]);

  /* ----- pinch ----- */
  const pinch = Gesture.Pinch()
    .onStart(() => {
      lastScale.value = scale.value;
    })
    .onUpdate((e) => {
      // ignore bogus first sample (e.scale === 0) & clamp
      const raw = e.scale === 0 ? 1 : e.scale;
      scale.value = lastScale.value * raw;
    });

  /* ----- pan (delta ÷ current scale!) ----- */
  const pan = Gesture.Pan()
    .onStart(() => {
      lastPanX.value = translateX.value;
      lastPanY.value = translateY.value;
    })
    .onUpdate((e) => {
      const s = scale.value; // current zoom
      translateX.value = lastPanX.value + e.translationX / s;
      translateY.value = lastPanY.value + e.translationY / s;
    });

  const gesture = Gesture.Simultaneous(pinch, pan); // order matters: pinch first

  const resetTransforms = () => {
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
  };

  return { gesture, animTransform, resetTransforms } as const;
}

/* -------------------------------------------------------------------------- */
/*                           Rendering / Data Helpers                         */
/* -------------------------------------------------------------------------- */

function drawCoOccurrenceGraph(
  contacts: Contact[],
  width: number,
  height: number,
  font: SkFont,
  minEdgeWeight: number,
  theme: any
): GraphResult | null {
  const { nodes, edges } = buildCoOccurrenceGraphData(contacts);
  if (!nodes.length) return null;

  /* ───── filter edges & compute node degrees ──────────────────────────── */
  nodes.forEach((n) => (n.count = 0));
  const keptEdges = edges.filter((e) => e.weight >= minEdgeWeight);
  keptEdges.forEach((e) => {
    e.source.count += 1;
    e.target.count += 1;
  });
  if (!keptEdges.length) return null;

  /* ───── node sizing ───────────────────────────────────────────────────── */
  const maxCnt = Math.max(...nodes.map((n) => n.count));
  const minR = 16;
  const maxR = 40;
  nodes.forEach((n) => {
    (n as any).r = minR + ((maxR - minR) * n.count) / (maxCnt || 1);
  });

  /* ───── layout ────────────────────────────────────────────────────────── */
  runForceLayout(nodes as any, keptEdges as any, width, height);

  /* ───── compute bounds ───────────────────────────────────────────────── */
  const bounds = computeBounds(nodes as any);

  /* ───── build react‑native‑skia elements ─────────────────────────────── */
  const elements = buildSkiaElements(keptEdges, nodes, font, theme);

  return { elements, bounds };
}

/** Compute axis‑aligned bounding box around all rendered nodes */
function computeBounds(nodes: any[]): Bounds {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  nodes.forEach(({ x, y, r, count }) => {
    if (count === 0) return; // only hidden nodes are skipped

    minX = Math.min(minX, x - r);
    minY = Math.min(minY, y - r);
    maxX = Math.max(maxX, x + r);
    maxY = Math.max(maxY, y + r);
  });

  return { minX, minY, maxX, maxY };
}

/** Convert layout data into skia primitives */
function buildSkiaElements(
  edges: Edge[],
  nodes: Node[],
  font: SkFont,
  theme: any
) {
  const elements: React.ReactNode[] = [];

  // ───── edges
  edges.forEach((e, i) => {
    const s = e.source as any;
    const t = e.target as any;
    const weight = Math.pow(e.weight, 0.7);
    elements.push(
      <Line
        key={`edge-${i}`}
        p1={vec(s.x, s.y)}
        p2={vec(t.x, t.y)}
        strokeWidth={weight}
        color={theme.text.full}
      >
        <Path1DPathEffect
          path={`M -${weight} 0 L 0 -${weight}, ${weight} 0, 0 ${weight} Z`}
          advance={4}
          phase={0}
          style="rotate"
        />
      </Line>
    );
  });

  // ───── nodes + labels
  nodes.forEach((n, i) => {
    if (n.count === 0) return;
    const { x, y, r } = n as any;
    const label = String(n.name.split(" ")[0]);

    elements.push(
      <Circle key={`node-${i}`} cx={x} cy={y} r={r} color="#3b82f6">
        <RadialGradient c={{ x, y }} r={r} colors={["#3F5EFB", "#433beb"]} />
      </Circle>
    );

    elements.push(buildNodeLabel(label, i, x, y, r, font));
  });

  return elements;
}

/** A tiny helper to render a scaled text label inside a bubble */
function buildNodeLabel(
  label: string,
  idx: number,
  x: number,
  y: number,
  r: number,
  font: SkFont
) {
  const w = font.measureText(label).width;
  const { ascent, descent } = font.getMetrics();
  const baselineY = y + (descent - ascent) / 2 - descent;

  return (
    <Group
      key={`label-${idx}`}
      transform={[{ scale: r * 0.03 }]}
      origin={{ x, y: baselineY }}
    >
      <SkiaText
        x={x - w / 2}
        y={baselineY}
        text={label}
        font={font}
        color="white"
      />
    </Group>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Data Builder                                 */
/* -------------------------------------------------------------------------- */

function buildCoOccurrenceGraphData(contacts: Contact[]): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodesMap = new Map<string, Node>();
  contacts.forEach(({ id, name }) => nodesMap.set(id, { id, name, count: 0 }));

  // bucket contact IDs by tag
  const tagBuckets = new Map<string, string[]>();
  contacts.forEach(({ id, tags }) => {
    tags.forEach((tag) => {
      (tagBuckets.get(tag) ?? tagBuckets.set(tag, []).get(tag)!).push(id);
    });
  });

  // build unique edges (undirected, A|B ordering)
  const edgesMap = new Map<string, Edge>();
  for (const ids of tagBuckets.values()) {
    for (let i = 0; i < ids.length - 1; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const [a, b] = ids[i] < ids[j] ? [ids[i], ids[j]] : [ids[j], ids[i]];
        const key = `${a}|${b}`;
        (
          edgesMap.get(key) ??
          edgesMap
            .set(key, {
              source: nodesMap.get(a)!,
              target: nodesMap.get(b)!,
              weight: 0,
            })
            .get(key)!
        ).weight += 1;
      }
    }
  }

  return { nodes: [...nodesMap.values()], edges: [...edgesMap.values()] };
}
function clamp(n: number, lo: number, hi: number) {
  if (!Number.isFinite(n) || n === 0) return lo; // <-- new guard
  return Math.min(Math.max(n, lo), hi);
}
