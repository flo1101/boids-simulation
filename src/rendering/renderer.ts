import p5 from 'p5';
import { Simulation } from '../core/simulation';

export class Renderer {
    private p: p5;

    constructor(p: p5) {
        this.p = p;
    }

    draw(simulation: Simulation): void {
        this.p.background(20);
        for (const agent of simulation.agents) {
            this.p.fill(255);
            this.p.noStroke();
            this.p.circle(agent.position.x, agent.position.y, 10);
        }
    }
}
