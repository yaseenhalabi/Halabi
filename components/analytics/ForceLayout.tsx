// layout.ts
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceLink,
  forceCollide,
  forceX,
  forceY,
  SimulationNodeDatum,
} from "d3-force";

/** Mutates nodes so they get x / y positions */
export function runForceLayout(
  nodes: (SimulationNodeDatum & { r: number; count: number })[],
  links: { source: any; target: any; weight: number }[],
  width: number,
  height: number
) {
  const maxCnt = Math.max(...nodes.map((n) => n.count));
  const sim = forceSimulation(nodes)
    // 1) link force (heavier edges pull harder)
    .force(
      "link",
      forceLink(links)
        .id((d: any) => d.id)
        .distance((l: any) => 60 / Math.log2(l.weight + 1))
        .strength(0.7)
    )
    // 2) charge (bigger nodes repel more)
    .force(
      "charge",
      forceManyBody().strength((d: any) => -40 * (1 + d.count / maxCnt))
    )
    // 3) keep everything roughly centered
    .force("center", forceCenter(width / 2, height / 2))
    // 4) gently pull each node toward center so clusters form
    .force("x", forceX(width / 2).strength(0.1))
    .force("y", forceY(height / 2).strength(0.1))
    // 5) prevent overlaps
    .force(
      "collision",
      forceCollide().radius((d: any) => d.r + 4)
    )
    // crank up initial “temperature” so we can tick synchronously
    .alpha(1)
    .alphaDecay(0.05);

  // give it enough ticks to settle
  for (let i = 0; i < 140; i++) {
    sim.tick();
  }
  sim.stop();

  // no viewport clamping—nodes can float anywhere solutions of the forces land them
}
