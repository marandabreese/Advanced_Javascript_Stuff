import {Shape} from './shape.js';

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }

    getArea() {
        let area = (this.radius ** 2) * Math.PI;
        return area;
    }
}