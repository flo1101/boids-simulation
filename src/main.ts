import p5 from 'p5';
import { Simulation } from './core/simulation';
import { Renderer } from './rendering/renderer';

new p5((p: p5) => {
    const simulation = new Simulation(800, 600);
    const renderer = new Renderer(p);

    p.setup = () => {
        p.createCanvas(800, 600);
        simulation.init();
    };

    p.draw = () => {
        renderer.draw(simulation);
    };
});
