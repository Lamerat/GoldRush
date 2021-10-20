import staticTypes from '../common/static-types.js';

export class Tool {
  static #pickSound = new Audio('./sounds/pick_tool.wav');
  #toolImage = new Image();
  #type = staticTypes.TOOL;
  #context;
  #xPos;
  #yPos;
  #width;
  #height;

  get type() {
    return this.#type;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }


  constructor (canvas, image) {
    this.#context = canvas;
    this.#xPos = 620;
    this.#yPos = 120;
    this.#toolImage.src = image;
    this.#width = this.#toolImage.width;
    this.#height = this.#toolImage.height;
  }

  draw() {
    this.#context.drawImage(this.#toolImage, this.#xPos - this.#width / 2, this.#yPos - this.#height / 2);
  }

  endPoints() {
    return {
      x: this.#xPos - this.#width / 2,
      y: this.#yPos - this.#height / 2,
    }
  }

  playPickSound() {
    Tool.#pickSound.play();
  }
}