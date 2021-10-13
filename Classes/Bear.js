import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class Bear extends MobileObject {
  static #bearImage = '../images/bear.png';
  static #startPositions = [
    { x: 436, y: 280 }
  ];
  
  static #points = [
    [[452, 418], [293, 418], [293, 380], [180, 270], [200, 200], [230, 180], [360, 180]]
  ];

  #type = enemyType.BEAR;

  get type() {
    return this.#type;
  }

  constructor(canvas) {
    super(canvas, Bear.#bearImage, Bear.#startPositions[0].x, Bear.#startPositions[0].y, Bear.#points[0])
  }

}