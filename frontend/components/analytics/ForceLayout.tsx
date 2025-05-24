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

export interface ForceLayoutConfig {
  /** Base link distance (used before applying log scaling and spacingFactor) */
  linkDistance?: number;
  /** Link strength (0–1) */
  linkStrength?: number;
  /** Base charge (repulsion) strength (negative values repel) */
  chargeStrength?: number;
  /** Padding around nodes for the collision force */
  collisionPadding?: number;
  /** Strength of the x/y centering forces (0–1) */
  forceXYStrength?: number;
  /** Multiplier on computed link distances (spread control) */
  spacingFactor?: number;
  /** Initial simulation alpha ("temperature") */
  initialAlpha?: number;
  /** Alpha decay rate per tick */
  alphaDecay?: number;
}

export const defaultForceLayoutConfig: ForceLayoutConfig = {
  linkDistance: 20,
  linkStrength: 1,
  chargeStrength: -40,
  collisionPadding: 8,
  forceXYStrength: 0.1,
  spacingFactor: 1,
  initialAlpha: 2,
  alphaDecay: 0.05,
};
export function runForceLayout(
  nodes: (SimulationNodeDatum & { r: number; count: number })[],
  links: { source: any; target: any; weight: number }[],
  width: number,
  height: number,
  config: ForceLayoutConfig = {}
) {
  const cfg = { ...defaultForceLayoutConfig, ...config };
  const tickCount = Math.ceil(
    Math.min(Math.max(Math.pow(nodes.length, 1.1), 100), 400)
  );
  const maxCnt = Math.max(...nodes.map((n) => n.count));

  const sim = forceSimulation(nodes)
    .force(
      "link",
      forceLink(links)
        .id((d: any) => d.id)
        .distance(
          (l: any) =>
            (cfg.spacingFactor! * cfg.linkDistance!) / Math.log2(l.weight + 1)
        )
        .strength(cfg.linkStrength!)
    )
    .force(
      "charge",
      forceManyBody().strength(
        (d: any) => cfg.chargeStrength! * (1 + d.count / maxCnt)
      )
    )
    .force("center", forceCenter(width / 2, height / 2))
    .force("x", forceX(width / 2).strength(cfg.forceXYStrength!))
    .force("y", forceY(height / 2).strength(cfg.forceXYStrength!))
    .force(
      "collision",
      forceCollide().radius((d: any) => d.r + cfg.collisionPadding!)
    )
    .alpha(cfg.initialAlpha!)
    .alphaDecay(cfg.alphaDecay!);

  for (let i = 0; i < tickCount; i++) {
    sim.tick();
  }
  sim.stop();
}
