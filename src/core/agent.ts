import { Vector } from './vector';

export class Agent {
    // Constants
    MAX_SPEED: number = 3;
    FIELD_OF_VIEW: number = Math.PI * 1.5; // 270 degrees
    RADIUS: number = 5;

    // Variables
    position: Vector;
    velocity: Vector;
    acceleration: Vector;

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
        this.velocity = this.velocity.limit(this.MAX_SPEED);
        this.position = this.position.add(this.velocity);
        this.acceleration = new Vector(0, 0); // acceleration is recomputed based on appllied forces each tick
    }
}
