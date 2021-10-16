import { enemyType } from '../common/enemy-type.js';
import { MobileObject } from './MobileObject.js';

export class ClaimJumper extends MobileObject {
  static #claimJumper = './images/claim_jumper.png';
  static #startPositions = [
    { x: 100, y: 30 }
  ];

  static #points = [
    [[100, 30], [100, 106], [36, 106], [100, 170], [100, 220], [60, 260], [100, 300], [100, 346], [36, 346], [95, 405],
      [95, 470], [125, 435], [240, 435], [240, 320], [220, 300], [220, 180], [160, 120], [100, 120]]
  ];

  static #returnPoints = {
    1: [[100, 125], [220, 125], [220, 25], [252, 25]],
    2: [[100, 125], [155, 125]],
    3: [[155, 250]],
    4: [[100, 445], [155, 445]],
    5: [[230, 260], [230, 200], [515, 200], [585, 270]],
    6: [[210, 260], [290, 340], [750, 340], [750, 475]],
    7: [[205, 255], [315, 365], [315, 430], [400, 430]],
    8: [[210, 260], [260, 310], [330, 310], [330, 285]],
    9: [[220, 260], [325, 155], [355, 155]],
    10: [[210, 260], [290, 340], [450, 340], [450, 285]]
  }

  #type = enemyType.CLAIM_JUMPER;

  get type() {
    return this.#type;
  }

  constructor(canvas, level = 1, returner = false, position = 1) {
    if (!returner) {
      super(canvas, ClaimJumper.#claimJumper, ClaimJumper.#startPositions[level - 1].x, ClaimJumper.#startPositions[level - 1].y, ClaimJumper.#points[level - 1]);
    } else {
      super(canvas, ClaimJumper.#claimJumper, 100, 260, ClaimJumper.#returnPoints[position]);
    }
  }


  update() {
    if(super.update() >= 1) {
      return true;
    }
  }

  tempDraw(ctx) {
    const img = new Image();
    img.src = ClaimJumper.#claimJumper;
    const width = img.width;
    const height = img.height;
    ClaimJumper.#points[0].forEach(x => ctx.drawImage(img, x[0] - width / 2, x[1] - height / 2))
  }
}