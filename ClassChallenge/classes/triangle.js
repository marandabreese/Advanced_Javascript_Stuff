import {Shape} from './shape.js';

class Triangle extends Shape {
    constructor(color, base, height) {
        super(color);
        this.base = base;
        this.height = height;
    }

    getArea() {
        let area = this.base * this.height;
        return area;
    }
}