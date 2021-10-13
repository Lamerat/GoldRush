import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class Indian extends MobileObject {
  static #indianImage = '../images/indian.png';
  static #startPositions = [
    { x: 596, y: 96 }
  ];
  
  static #points = [
    [[596, 0], [470, 0], [470, 96], [596, 96], [716, 96], [716, 186], [596, 186]]
  ];

  #type = enemyType.INDIAN;

  get type() {
    return this.#type;
  }

  constructor(canvas) {
    super(canvas, Indian.#indianImage, Indian.#startPositions[0].x, Indian.#startPositions[0].y, Indian.#points[0])
  }

}