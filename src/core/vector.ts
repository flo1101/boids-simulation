// src/simulation/vector.ts

export class Vector {
    public components: number[];

    constructor(...components: number[]) {
        this.components = [...components];
    }

    get x(): number {
        return this.components[0];
    }
    get y(): number {
        return this.components[1];
    }
    get z(): number | undefined {
        return this.components[2];
    }

    get dimensions(): number {
        return this.components.length;
    }

    add(v: Vector): Vector {
        this.assertSameDimensions(v);
        return new Vector(...this.components.map((c, i) => c + v.components[i]));
    }

    sub(v: Vector): Vector {
        this.assertSameDimensions(v);
        return new Vector(...this.components.map((c, i) => c - v.components[i]));
    }

    scale(n: number): Vector {
        return new Vector(...this.components.map((c) => c * n));
    }

    magnitude(): number {
        return Math.sqrt(this.components.reduce((sum, c) => sum + c ** 2, 0));
    }

    normalize(): Vector {
        const mag = this.magnitude();
        if (mag === 0) return new Vector(...this.components.map(() => 0));
        return this.scale(1 / mag);
    }

    limit(max: number): Vector {
        if (this.magnitude() > max) return this.normalize().scale(max);
        return this;
    }

    distanceTo(v: Vector): number {
        return this.sub(v).magnitude();
    }

    copy(): Vector {
        return new Vector(...this.components);
    }

    private assertSameDimensions(v: Vector): void {
        if (this.dimensions !== v.dimensions) {
            throw new Error(`Dimension mismatch: ${this.dimensions}D and ${v.dimensions}D`);
        }
    }
}
