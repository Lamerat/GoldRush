import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class Solider extends MobileObject {
  static #soliderImage = '../images/soldier.png';
  static #startPositions = [
    { x: 580, y: 346 }
  ];
  
  static #points = [
    [[580, 474], [752, 474], [752, 350], [536, 195], [478, 195], [478, 120], [492, 110], [492, 22], [740, 22], [740, 206]],
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