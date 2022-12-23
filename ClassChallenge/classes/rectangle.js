import {Shape} from './shape.js';

class Rectangle extends Shape {
    constructor(color, height, width) {
        super(color);
        this.height = height;
        this.width = width;
    }

    getArea() {
        let area = this.height * this.width;
        return area;
    }
}