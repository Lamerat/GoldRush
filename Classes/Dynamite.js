import { dynamitePositions } from '../common/dynamite-positions.js';
import staticTypes from '../common/static-types.js';

export class Dynamite {
  static #pickSound = new Audio('./sounds/pick.wav');
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
  #position;

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

  get xPos() {
    return this.#xPos;
  }

  get yPos() {
    return this.#yPos;
  }

  get position() {
    return this.#position;
  }


  constructor (canvas, position) {
    this.#context = canvas;
    this.#position = position;
    this.#xPos = dynamitePositions[position][0];
    this.#yPos = dynamitePositions[position][1];
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

  playPickSound() {
    Dynamite.#pickSound.play();
  }
}