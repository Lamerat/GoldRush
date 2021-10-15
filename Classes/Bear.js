import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class Bear extends MobileObject {
  static #bearImage = '../GoldRush/images/bear.png';
  static #startPositions = [
    { x: 454, y: 280 }
  ];
  
  static #points = [
    [[472, 298], [472, 436], [316, 436], [316, 380], [210, 274], [210, 235], [265, 190], [382, 190], [472, 280]]
  ];

  #type = enemyType.BEAR;

  get type() {
    return this.#type;
  }

  constructor(canvas) {
    super(canvas, Bear.#bearImage, Bear.#startPositions[0].x, Bear.#startPositions[0].y, Bear.#points[0])
  }

  tempDraw(ctx) {
    const img = new Image();
    img.src = Bear.#bearImage;
    const width = img.width;
    const height = img.height;
    Bear.#points[0].forEach(x => ctx.drawImage(img, x[0] - width / 2, x[1] - height / 2))
  }

}