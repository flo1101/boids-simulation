import { Agent } from './agent';
import { Vector } from './vector';

export class Simulation {
    agents: Agent[] = [];
    width: number;
    height: number;

    private agentCount: number;

    constructor(width: number, height: number, agentCount: number = 1) {
        this.width = width;
        this.height = height;
        this.agentCount = agentCount;
    }

    init(): void {
        this.agents = [];
        for (let i = 0; i < this.agentCount; i++) {
            const position = new Vector(this.width / 2, this.height / 2);
            const velocity = new Vector(0, 0);
            const acceleration = new Vector(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
            );
            this.agents.push(new Agent(position, velocity, acceleration));
        }
    }

    step(): void {
        for (const agent of this.agents) {
            // Compute forces
            // Apply forces
            // Render next tick
        }
    }
}
