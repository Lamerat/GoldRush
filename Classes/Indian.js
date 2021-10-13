import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class Indian extends MobileObject {
  static #indianImage = '../images/indian.png';
  static #startPositions = [
    { x: 620, y: 116 }
  ];
  
  static #points = [
    [[620, 21], [491, 21], [491, 112], [620, 112],  [738, 116], [738, 204], [620, 204]]
  ];

  #type = enemyType.INDIAN;

  get type() {
    return this.#type;
  }

  constructor(canvas) {
    super(canvas, Indian.#indianImage, Indian.#startPositions[0].x, Indian.#startPositions[0].y, Indian.#points[0]);
  }


  tempDraw(ctx) {
    const img = new Image();
    img.src = Indian.#indianImage;
    const width = img.width;
    const height = img.height;
    Indian.#points[0].forEach(x => ctx.drawImage(img, x[0] - width / 2, x[1] - height / 2))
  }
}