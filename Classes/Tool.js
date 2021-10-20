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
    this.#toolImage.src = image;
    this.#width = this.#toolImage.width;
    this.#height = this.#toolImage.height;
    // this.#xPos = 620 - this.#width / 2;
    // this.#yPos = 120 - this.#height / 2;
    this.#xPos = 620
    this.#yPos = 120
  }

  draw() {
    const x = this.#xPos - this.#width / 2;
    const y = this.#yPos - this.#height / 2;
    // this.#context.drawImage(this.#toolImage, this.#xPos, this.#yPos);
    this.#context.drawImage(this.#toolImage, x, y);
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