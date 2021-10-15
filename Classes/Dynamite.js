import staticTypes from '../common/static-types.js';

export class Dynamite {
  static #dynamiteId = 0;
  static #dynamiteImagePath = './images/tnt.png';
  #dynamiteImage = new Image();
  #type = staticTypes.TNT;
  #context;
  #xPos;
  #yPos;
  #width;
  #height;
  #id;

  get type() {
    return this.#type;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get id() {
    return this.#id;
  }


  constructor (canvas, x, y) {
    this.#context = canvas;
    this.#xPos = x;
    this.#yPos = y;
    this.#dynamiteImage.src = Dynamite.#dynamiteImagePath;
    this.#width = this.#dynamiteImage.width;
    this.#height = this.#dynamiteImage.height;
    this.#id = `dynamite_${Dynamite.#dynamiteId}`;
    Dynamite.#dynamiteId = Dynamite.#dynamiteId + 1;
  }

  draw() {
    const width = this.#dynamiteImage.width;
    const height = this.#dynamiteImage.height;
    this.#context.drawImage(this.#dynamiteImage, this.#xPos - this.#width / 2, this.#yPos - this.#height / 2);
  }

  endPoints() {
    return {
      x: this.#xPos - this.#width / 2,
      y: this.#yPos - this.#height / 2,
    }
  }
}