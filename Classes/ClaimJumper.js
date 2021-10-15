import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class ClaimJumper extends MobileObject {
  static #claimJumper = './images/claim_jumper.png';
  static #startPositions = [
    { x: 80, y: 10 }
  ];
  
  // [[],[80, 91], [10, 91], [50, 120], [80, 220], [30, 240], [70, 250], [80, 330], [10, 330], [80, 390], [80, 430], [220, 430], [220, 260], [200, 206], [200, 150], [150, 110], [80, 110], [80, 10]]

  static #points = [
    [[100, 30], [100, 106], [36, 106], [100, 170], [100, 220], [60, 260], [100, 300], [100, 346], [36, 346], [95, 405],
      [95, 470], [125, 435], [240, 435], [240, 320], [220, 300], [220, 180], [160, 120], [100, 120]]
  ];

  #type = enemyType.CLAIM_JUMPER;

  get type() {
    return this.#type;
  }

  constructor(canvas) {
    super(canvas, ClaimJumper.#claimJumper, ClaimJumper.#startPositions[0].x, ClaimJumper.#startPositions[0].y, ClaimJumper.#points[0])
  }

  tempDraw(ctx) {
    const img = new Image();
    img.src = ClaimJumper.#claimJumper;
    const width = img.width;
    const height = img.height;
    ClaimJumper.#points[0].forEach(x => ctx.drawImage(img, x[0] - width / 2, x[1] - height / 2))
  }
}