import { gameActions } from '../common/game-actions.js';
import { Player } from './Player.js';
import { StaticObject } from './StaticObject.js';
import { staticObjectsCoordinates } from '../common/static-objects-coordinates.js';
import { ClaimJumper } from './ClaimJumper.js';
import { enemyType } from '../common/enemy-type.js';
import { Dynamite } from './Dynamite.js';
import staticTypes from '../common/static-types.js';
import { Score } from './Score.js';
import { gameLevels } from '../common/levels.js';
import { BlowMine } from './BlowMine.js';
import { bagsData } from '../common/bags-data.js';

export class Game {
  static #bagImage = new Image ();
  static #backgroundImage = new Image();
  static #singleton = false;
  static #gameActions = { left: false, right: false, up: false, down: false };
  static #barriers = [];
  static #movingObjects = [];
  static #staticObjects = [];
  static #JumperReturner;
  static #mineBlow;
  #mines = {one: false, two: false, three: false, four: false};
  #context;
  #level = 1;
  #scoreBoard;
  #currentTNT;
  #player;
  #gameInterval;


  constructor (context) {
    if (Game.#singleton) {
      return;
    }

    this.#context = context;
    Game.#singleton = true;
    Game.#backgroundImage.src = './images/background.png';
    Game.#bagImage.src = './images/bag.png'
    this.#scoreBoard = new Score(context);
    this.#player = new Player(context);
    staticObjectsCoordinates.forEach(coords => Game.#barriers.push(new StaticObject(this.#context, ...coords)));

    this.changeLevel();
    this.changeRound();
    this.#gameInterval = setInterval(() => this.frame(), 1000.0/60.0);
  }

  changeLevel() {
    gameLevels[this.#level].movingObjects.forEach(object => Game.#movingObjects.push(object(this.#context, this.#level)));
  }

  changeRound() {
    Game.#staticObjects = [];
    const randomDynamite = new Set();
    while (randomDynamite.size < 4) {
      randomDynamite.add(Math.floor(Math.random() * 10) + 1);
    }
    randomDynamite.forEach(dynamite => Game.#staticObjects.push(new Dynamite(this.#context, dynamite)));
  }

  resetRound() {
    Game.#movingObjects = [];
    gameLevels[this.#level].movingObjects.forEach(object => Game.#movingObjects.push(object(this.#context, this.#level)));
    this.#player.resetPosition();
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

  drawBackGround () {
    this.#context.drawImage(Game.#backgroundImage, 0, 0);
    this.#scoreBoard.draw();
    this.#scoreBoard.draw();
    this.drawBags();
  }

  draw() {
    this.drawBackGround();
    this.#player.draw();
    Game.#barriers.forEach(x => x.draw());
    Game.#staticObjects.forEach(x => x.draw());
    Game.#movingObjects.forEach(x => x.draw());
    // Game.#movingObjects.forEach(x => x.tempDraw(this.#context));
  }

  returnDynamite() {
    clearInterval(this.#gameInterval);
    Game.#staticObjects.push(this.#currentTNT);
    this.#player.haveTNT = false;
    Game.#JumperReturner = new ClaimJumper(this.#context, this.#level, true, this.#currentTNT.position);
    this.#gameInterval = setInterval(() => this.drawOnlyJumper(), 1000.0/60.0);
  }

  drawBlow(mine) {
    this.drawBackGround();

    if (Game.#mineBlow.draw() > 6) {
      clearInterval(this.#gameInterval);
      this.#mines[bagsData[mine].name] = true;
      this.resetRound();
      this.#gameInterval = setInterval(() => this.frame(), 1000/60);
      return;
    }
  }

  setDynamite(mine) {
    clearInterval(this.#gameInterval);
    Game.#mineBlow = new BlowMine(this.#context, {x: bagsData[mine].x, y: bagsData[mine].y});
    this.drawBlow();
    this.#gameInterval = setInterval(() => this.drawBlow(mine), 400);
    this.#scoreBoard.updateScore();
  }

  drawOnlyJumper() {
    this.drawBackGround();
    
    if (Game.#JumperReturner.update()) {
      clearInterval(this.#gameInterval);
      this.resetRound();
      this.#gameInterval = setInterval(() => this.frame(), 1000.0/60.0);
      return;
    }

    Game.#JumperReturner.draw();
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
          setTimeout(() => this.returnDynamite(), 30);
        }
      } else {
        setTimeout(() => clearInterval(this.#gameInterval), 70);
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
      this.setDynamite(1);
    }

    if (y >= 123 && y < 125 && !this.#mines.two) {
      this.setDynamite(2);
    }

    if (y >= 243 && y < 245 && !this.#mines.three) {
      this.setDynamite(3);
    }

    if (y >= 363 && y < 365 && !this.#mines.four) {
      this.setDynamite(4);
    }
  }

  drawBags() {
    if (this.#mines.one) {
      this.#context.drawImage(Game.#bagImage, bagsData[1].x, bagsData[1].y);
    }

    if (this.#mines.two) {
      this.#context.drawImage(Game.#bagImage, bagsData[2].x, bagsData[2].y);
    }

    if (this.#mines.three) {
      this.#context.drawImage(Game.#bagImage, bagsData[3].x, bagsData[3].y);
    }

    if (this.#mines.four) {
      this.#context.drawImage(Game.#bagImage, bagsData[4].x, bagsData[4].y);
    }
  }
}