import staticTypes from '../common/static-types.js';
export class StaticObject {
  #type = staticTypes.BARRIER;
  #canvas;
  #width;
  #height;
  #xPos;
  #yPos;

  constructor(ctx, x, y, w, h) {
    this.#canvas = ctx;
    this.#xPos = x;
    this.#yPos = y;
    this.#width = w;
    this.#height = h;
  }

  get type() {
    return this.#type;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }


  draw() {
    const ctx = this.#canvas
    // ctx.beginPath();
    // ctx.strokeStyle = 'red';
    // ctx.rect(this.xPos - this.width /2, this.yPos - this.height / 2, this.width, this.height );
    // ctx.stroke();
  }

  endPoints() {
    return {
      x: this.#xPos - this.#width / 2,
      y: this.#yPos - this.#height / 2,
    }
  }
}