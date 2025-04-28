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

/**
 * Configuration options for the force layout.
 * Tweak these values to adjust spacing, repulsion, link strength, etc.
 */
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
  /** Number of ticks to run before stopping */
  tickCount?: number;
}

/** Default values for layout constants */
export const defaultForceLayoutConfig: ForceLayoutConfig = {
  linkDistance: 20,
  linkStrength: 0.7,
  chargeStrength: -40,
  collisionPadding: 8,
  forceXYStrength: 0.1,
  spacingFactor: 1,
  initialAlpha: 1,
  alphaDecay: 0.05,
  tickCount: 140,
};

/**
 * Runs a D3 force layout on the given nodes and links,
 * mutating each node with x/y positions.
 *
 * @param nodes Array of node objects (must include `r` and `count`)
 * @param links Array of link objects (must include `weight`)
 * @param width  Width of the layout viewport
 * @param height Height of the layout viewport
 * @param config Optional overrides for layout constants
 */
export function runForceLayout(
  nodes: (SimulationNodeDatum & { r: number; count: number })[],
  links: { source: any; target: any; weight: number }[],
  width: number,
  height: number,
  config: ForceLayoutConfig = {}
) {
  // Merge defaults with any user-provided overrides
  const cfg = { ...defaultForceLayoutConfig, ...config };

  // Determine max count for scaling charge by node size
  const maxCnt = Math.max(...nodes.map((n) => n.count));

  const sim = forceSimulation(nodes)
    // Link force: distance inversely proportional to log2(weight+1)
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
    // Charge force: larger nodes repel more
    .force(
      "charge",
      forceManyBody().strength(
        (d: any) => cfg.chargeStrength! * (1 + d.count / maxCnt)
      )
    )
    // Center the graph
    .force("center", forceCenter(width / 2, height / 2))
    // Gently pull each node toward center for clustering
    .force("x", forceX(width / 2).strength(cfg.forceXYStrength!))
    .force("y", forceY(height / 2).strength(cfg.forceXYStrength!))
    // Prevent overlaps
    .force(
      "collision",
      forceCollide().radius((d: any) => d.r + cfg.collisionPadding!)
    )
    // Initial temperature and decay
    .alpha(cfg.initialAlpha!)
    .alphaDecay(cfg.alphaDecay!);

  // Run the simulation for a fixed number of ticks
  for (let i = 0; i < cfg.tickCount!; i++) {
    sim.tick();
  }
  sim.stop();
}
