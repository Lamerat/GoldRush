import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class Solider extends MobileObject {
  static #soliderImage = '../images/soldier.png';
  static #startPositions = [
    { x: 558, y: 366 }
  ];
  
  static #points = [
    [[558, 456], [738, 456], [738, 326], [460, 175], [460, 96], [470, 96], [470, 0], [720, 0], [720, 180]],
  ];

  #type = enemyType.SOLDIER;

  get type() {
    return this.#type;
  }

  constructor(canvas) {
    super(canvas, Solider.#soliderImage, Solider.#startPositions[0].x, Solider.#startPositions[0].y, Solider.#points[0])
  }

  tempDraw(ctx) {
    const img = new Image();
    img.src = Solider.#soliderImage;
    const width = img.width;
    const height = img.height;
    Solider.#points[0].forEach(x => ctx.drawImage(img, x[0] - width / 2, x[1] - height / 2))
  }

}