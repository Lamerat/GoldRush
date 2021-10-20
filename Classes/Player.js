export class Player {
  static #playerImage = new Image();

  #context;
  #xPos = 800;
  #yPos = 300;
  #playerWidth;
  #playerHeight;
  #moveStep = 3;
  #haveTNT = false;
  #haveTool = false;

  #minX;
  #maxX;
  #minY;
  #maxY;

  constructor(canvas) {
    this.#context = canvas;
    Player.#playerImage.src = './images/player.png';
    this.#playerWidth = Player.#playerImage.width;
    this.#playerHeight = Player.#playerImage.height;

    this.#minX = this.#playerWidth / 2 + 10;
    this.#maxX = this.#context.canvas.width - 80;
    this.#minY = this.#playerHeight / 2 + 1;
    this.#maxY = this.#context.canvas.height - 122;
  }

  get playerWidth() {
    return this.#playerWidth;
  }

  get playerHeight() {
    return this.#playerHeight;
  }

  get moveStep() {
    return this.#moveStep;
  }

  get haveTNT() {
    return this.#haveTNT;
  }

  get haveTool() {
    return this.#haveTool;
  }

  set haveTNT(value) {
    if (typeof value !== 'boolean') {
      throw new Error ('haveTNT must be boolean!');
    }
    this.#haveTNT = value;
  }

  set haveTool(value) {
    if (typeof value !== 'boolean') {
      throw new Error ('haveTNT must be boolean!');
    }
    this.#haveTool = value;
  }


  moveLeft() {
    if (this.#xPos > this.#minX) {
      this.#xPos = this.#xPos - this.#moveStep;
    }
  }

  moveRight() {
    if (this.#xPos < this.#maxX) {
      this.#xPos = this.#xPos + this.#moveStep;
    }
  }

  moveUp() {
    if (this.#yPos > this.#minY) {
      this.#yPos = this.#yPos - this.#moveStep;
    }
  }

  moveDown() {
    if (this.#yPos < this.#maxY) {
      this.#yPos = this.#yPos + this.#moveStep;
    }
  }

  draw() {
    this.#context.drawImage(Player.#playerImage, this.#xPos - this.#playerWidth / 2, this.#yPos - this.playerHeight / 2);
  }

  resetPosition() {
    this.#xPos = 800;
    this.#yPos = 300;
    this.#haveTNT = false;
    this.#haveTool = false;
  }

  endPoints() {
    return {
      x: this.#xPos - this.#playerWidth / 2,
      y: this.#yPos - this.#playerHeight / 2,
    }
  }

}