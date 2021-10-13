import { gameActions } from '../common/game-actions.js';
import { Player } from './Player.js';
import { StaticObject } from './StaticObject.js';
import { staticObjectsCoordinates } from '../common/static-objects-coordinates.js';
import { Indian } from './Indian.js';
import { Solider } from './Solider.js';
import { Bear } from './Bear.js';
import { ClaimJumper } from './ClaimJumper.js';

export class Game {
  static #singleton = false;
  static #backgroundImage = new Image();
  static #gameActions = { left: false, right: false, up: false, down: false };
  static #staticObjects = [];
  static #movingObjects = [];

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
    this.#width = this.#context.canvas.width;
    this.#height = this.#context.canvas.height;
    this.#player = new Player(context);

    staticObjectsCoordinates.forEach(coords => Game.#staticObjects.push(new StaticObject(this.#context, ...coords)));

    Game.#movingObjects.push(new Indian(this.#context));
    Game.#movingObjects.push(new Solider(this.#context));
    Game.#movingObjects.push(new Bear(this.#context));
    Game.#movingObjects.push(new ClaimJumper(this.#context));
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

    if (Game.#gameActions.left && !this.checkCollision(this.#player.endPoints().x - this.#player.moveStep, this.#player.endPoints().y, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveLeft();
    }

    if (Game.#gameActions.right && !this.checkCollision(this.#player.endPoints().x + this.#player.moveStep, this.#player.endPoints().y, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveRight();
    }

    if (Game.#gameActions.up && !this.checkCollision(this.#player.endPoints().x, this.#player.endPoints().y - this.#player.moveStep, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveUp();
    }

    if (Game.#gameActions.down && !this.checkCollision(this.#player.endPoints().x, this.#player.endPoints().y + this.#player.moveStep, this.#player.playerWidth, this.#player.playerHeight)) {
      this.#player.moveDown();
    }
  }

  draw() {
    this.#context.drawImage(Game.#backgroundImage, 0, 0)
    this.#player.draw();
    Game.#staticObjects.forEach(x => x.draw());
    Game.#movingObjects.forEach(x => x.draw());
  }


  checkCollision = (x, y, width, height) => {
    let r1x = x;
    let r1y = y;
    let r1w = width;
    let r1h = height;

    let collision = false;
  
    Game.#staticObjects.forEach(barrier => {
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
}