import { Agent } from './agent';
import { Vector } from './vector';

type Neighbor = {
    agent: Agent;
    distance: number;
    direction: Vector;
};

export class Simulation {
    // Constants
    WIDTH: number;
    HEIGHT: number;

    // Variables
    agents: Agent[] = [];
    agentCount: number;
    tickCount: number = 0;
    isPaused: boolean = false;
    separationWeight: number = 1.5;
    alignmentWeight: number = 1.0;
    cohesionWeight: number = 1.0;

    constructor(width: number, height: number, agentCount: number = 1) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.agentCount = agentCount;
    }

    // Initialize agents
    init(): void {
        this.agents = [];
        for (let i = 0; i < this.agentCount; i++) {
            const position = new Vector(this.WIDTH / 2, this.HEIGHT / 2);
            const velocity = new Vector(0, 0);
            const acceleration = new Vector(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
            );
            this.agents.push(new Agent(position, velocity, acceleration));
        }
    }

    // Get neighbors of an agent within its field of view and radius
    getNeighbors(agent: Agent): Neighbor[] {
        const { position, velocity, RADIUS, FIELD_OF_VIEW } = agent;
        // TODO: optimize using spatial partitioning to avoid O(n^2) neighbor checks
        return this.agents.reduce((neighbors: Neighbor[], other) => {
            if (other === agent) return neighbors; // skip self

            const distance = position.distanceTo(other.position);

            // Check if other agent is within radius
            if (distance < RADIUS) {
                const direction_to_neighbor = other.position.sub(position).normalize();

                // Check if other agent is withing field of view
                const angle = velocity.angleTo(direction_to_neighbor);
                if (angle > FIELD_OF_VIEW / 2) return neighbors;

                neighbors.push({ agent: other, distance, direction: direction_to_neighbor });
            }
            return neighbors;
        }, []);
    }

    // TODO: implement force
    // Separation
    separation(agent: Agent, neighbors: Neighbor[]): Vector {
        return new Vector(0, 0);
    }

    // TODO: implement force
    // Alignment
    alignment(agent: Agent, neighbors: Neighbor[]): Vector {
        return new Vector(0, 0);
    }

    // TODO: implement force
    // Cohesion
    cohesion(agent: Agent, neighbors: Neighbor[]): Vector {
        return new Vector(0, 0);
    }

    // Compute total force for agent based on neighbors
    computeForce(agent: Agent, neighbors: Neighbor[]): Vector {
        const separation = this.separation(agent, neighbors);
        const alignment = this.alignment(agent, neighbors);
        const cohesion = this.cohesion(agent, neighbors);

        // Apply weight and sum forces
        return separation
            .scale(this.separationWeight)
            .add(alignment.scale(this.alignmentWeight))
            .add(cohesion.scale(this.cohesionWeight));
    }

    // Advance simulation by one tick
    step(): void {
        for (const agent of this.agents) {
            // Get neighbors
            const neighbors = this.getNeighbors(agent);

            // Compute forces
            const force: Vector = this.computeForce(agent, neighbors);

            // Apply forces
            agent.applyForce(force);

            // Render next tick
            agent.update();
        }
    }
}
