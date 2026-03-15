import { Vector } from './vector';

export class Agent {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxSpeed: number = 3;

    constructor(
        position: Vector = new Vector(0, 0),
        velocity: Vector = new Vector(0, 0),
        acceleration: Vector = new Vector(0, 0),
    ) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    applyForce(force: Vector): void {
        this.acceleration = this.acceleration.add(force);
    }

    update(): void {
        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);
        this.acceleration = new Vector(0, 0); // acceleration is recomputed based on appllied forces each tick
    }
}
