import { gameActions } from '../common/game-actions.js';
import { Player } from './Player.js';
import { StaticObject } from './StaticObject.js';
import { staticObjectsCoordinates } from '../common/static-objects-coordinates.js';
import { Indian } from './Indian.js';
import { Solider } from './Solider.js';
import { Bear } from './Bear.js';
import { ClaimJumper } from './ClaimJumper.js';
import { enemyType } from '../common/enemy-type.js';
import { Dynamite } from './Dynamite.js';
import staticTypes from '../common/static-types.js';
import { Score } from './Score.js';

export class Game {
  static #bagImage = new Image ();
  
  static #backgroundImage = new Image();
  static #singleton = false;
  static #gameActions = { left: false, right: false, up: false, down: false };
  static #barriers = [];
  static #movingObjects = [];
  static #staticObjects = [];

  gameInterval;
  #scoreBoard;
  #currentTNT;
  #mines = {one: false, two: false, three: false, four: false};
  #player;
  #context;
  #height;
  #width;

  constructor (context) {
    if (Game.#singleton) {
      return;
    }
    this.#context = context;
    this.#height = this.#context.canvas.height;
    this.#width = this.#context.canvas.width;
    Game.#singleton = true;
    Game.#backgroundImage.src = './images/background.png';
    Game.#bagImage.src = './images/bag.png'
    this.#width = this.#context.canvas.width;
    this.#height = this.#context.canvas.height;
    this.#scoreBoard = new Score(context);
    this.#player = new Player(context);

    staticObjectsCoordinates.forEach(coords => Game.#barriers.push(new StaticObject(this.#context, ...coords)));

    Game.#movingObjects.push(new Indian(this.#context));
    Game.#movingObjects.push(new Solider(this.#context));
    Game.#movingObjects.push(new Bear(this.#context));
    Game.#movingObjects.push(new ClaimJumper(this.#context));
    Game.#staticObjects.push(new Dynamite(this.#context, 252, 25));
    Game.#staticObjects.push(new Dynamite(this.#context, 155, 125));
    Game.#staticObjects.push(new Dynamite(this.#context, 155, 250));
    Game.#staticObjects.push(new Dynamite(this.#context, 155, 445));
  }


  actions(action) {
    switch (action) {
      case gameActions.LEFT_START:
        Game.#gameActions.left = true;
        break;
      case gameActions.LEFT_STOP:
        Game.#gameActions.left = false;
        break;
      case gameActions.RIGHT_START:
        Game.#gameActions.right = true;
        break;
      case gameActions.RIGHT_STOP:
        Game.#gameActions.right = false;
        break;
      case gameActions.UP_START:
        Game.#gameActions.up = true;
        break;
      case gameActions.UP_STOP:
        Game.#gameActions.up = false;
        break;
      case gameActions.DOWN_START:
        Game.#gameActions.down = true;
        break;
      case gameActions.DOWN_STOP:
        Game.#gameActions.down = false;
        break;
      default:
        break;
    }
  } 

  frame() {
    this.#context.clearRect(0, 0, this.#width, this.#height);
    this.draw();
    this.update();
  }

  update() {
    Game.#movingObjects.forEach(object => object.update());

    if (Game.#gameActions.left && !this.checkBarriers(this.#player.endPoints().x - this.#player.moveStep, this.#player.endPoints().y, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveLeft();
    }

    if (Game.#gameActions.right && !this.checkBarriers(this.#player.endPoints().x + this.#player.moveStep, this.#player.endPoints().y, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveRight();
    }

    if (Game.#gameActions.up && !this.checkBarriers(this.#player.endPoints().x, this.#player.endPoints().y - this.#player.moveStep, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveUp();
    }

    if (Game.#gameActions.down && !this.checkBarriers(this.#player.endPoints().x, this.#player.endPoints().y + this.#player.moveStep, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveDown();
    }

    this.checkEnemies(this.#player.endPoints().x, this.#player.endPoints().y, this.#player.playerWidth, this.#player.playerHeight);
    this.checkStatic(this.#player.endPoints().x, this.#player.endPoints().y, this.#player.playerWidth, this.#player.playerHeight);
    this.checkMines(this.#player.endPoints().x, this.#player.endPoints().y);
  }


  draw() {
    this.#context.drawImage(Game.#backgroundImage, 0, 0)
    this.#player.draw();
    this.drawBags();
    this.#scoreBoard.draw();
    Game.#barriers.forEach(x => x.draw());
    Game.#staticObjects.forEach(x => x.draw());
    Game.#movingObjects.forEach(x => x.draw());
    // Game.#movingObjects.forEach(x => x.tempDraw(this.#context));
  }


  checkBarriers (r1x, r1y, r1w, r1h) {
    let collision = false;
  
    Game.#barriers.forEach(barrier => {
      let r2x = barrier.endPoints().x;
      let r2y = barrier.endPoints().y;
      let r2w = barrier.width;
      let r2h = barrier.height;
      
      if (r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h) {
          collision =  true;
      }
    })

    return collision;
  }

  checkEnemies(r1x, r1y, r1w, r1h) {
    let collision = false;
    let objectType = null;

    Game.#movingObjects.forEach(object => {
      let r2x = object.endPoints().x;
      let r2y = object.endPoints().y;
      let r2w = object.objectWidth;
      let r2h = object.objectHeight;
      
      if (r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h) {
          collision =  true;
          objectType =  object.type;
      }
    });

    if (collision) {
      if (objectType === enemyType.CLAIM_JUMPER) {
        if (this.#player.haveTNT) {
          Game.#staticObjects.push(this.#currentTNT);
          this.#player.haveTNT = false;
        }
      } else {
        setTimeout(() => clearInterval(this.gameInterval), 70);
      }
    }

    return collision;
  }

  checkStatic(r1x, r1y, r1w, r1h) {
    Game.#staticObjects.forEach(object => {
      let r2x = object.endPoints().x;
      let r2y = object.endPoints().y;
      let r2w = object.width;
      let r2h = object.height;
      
      if (r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h) {
          if(!this.#player.haveTNT && object.type === staticTypes.TNT) {
            Game.#staticObjects = Game.#staticObjects.filter(x => x.id !== object.id);
            this.#player.haveTNT = true;
            this.#currentTNT = object;
          }
      }
    });
  }

  checkMines(x, y) {
    if (!this.#player.haveTNT || x > 40 || x < 38) {
      return;
    }

    if (y >= 6 && y < 8 && !this.#mines.one) {
      this.#mines.one = true;
      this.#player.haveTNT = false;
      this.#scoreBoard.updateScore();
      console.log ('MINE TOP');
    }

    if (y >= 123 && y < 125 && !this.#mines.two) {
      this.#mines.two = true;
      this.#player.haveTNT = false;
      this.#scoreBoard.updateScore();
      console.log ('MINE SECOND');
    }

    if (y >= 243 && y < 245 && !this.#mines.three) {
      this.#mines.three = true;
      this.#player.haveTNT = false;
      this.#scoreBoard.updateScore();
      console.log ('MINE THREE');
    }

    if (y >= 363 && y < 365 && !this.#mines.four) {
      this.#mines.four = true;
      this.#player.haveTNT = false;
      this.#scoreBoard.updateScore();
      console.log ('MINE BOTTOM');
    }
  }

  drawBags() {
    if (this.#mines.one) {
      this.#context.drawImage(Game.#bagImage, 39, 19);
    }

    if (this.#mines.two) {
      this.#context.drawImage(Game.#bagImage, 39, 138);
    }

    if (this.#mines.three) {
      this.#context.drawImage(Game.#bagImage, 39, 257);
    }

    if (this.#mines.four) {
      this.#context.drawImage(Game.#bagImage, 39, 376);
    }
  }

  createBag(position) {
    
  }
}