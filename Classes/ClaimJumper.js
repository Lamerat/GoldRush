import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class ClaimJumper extends MobileObject {
  static #claimJumper = '../images/claim_jumper.png';
  static #startPositions = [
    { x: 80, y: 10 }
  ];
  
  static #points = [
    [[80, 91], [10, 91], [50, 120], [80, 220], [30, 240], [70, 250], [80, 330], [10, 330], [80, 390], [80, 430], [220, 430], [220, 260], [200, 206], [200, 150], [150, 110], [80, 110], [80, 10]]
  ];

  #type = enemyType.CLAIM_JUMPER;

  get type() {
    return this.#type;
  }

  constructor(canvas) {
    super(canvas, ClaimJumper.#claimJumper, ClaimJumper.#startPositions[0].x, ClaimJumper.#startPositions[0].y, ClaimJumper.#points[0])
  }

}