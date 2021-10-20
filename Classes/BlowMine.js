export class BlowMine {
  static #blowImage = new Image();
  static #moneySound = new Audio('./sounds/coins.wav');
  #counter = 1;
  #context;
  #xBag;
  #yBag;
  #xDynamite;
  #yDynamite;
  
  constructor(canvas, position) {
    BlowMine.#moneySound.play();
    this.#context = canvas;
    this.#xBag = position.x;
    this.#yBag = position.y;
    this.#xDynamite = position.x - 20;
    this.#yDynamite = position.y - 12;
    BlowMine.#blowImage.src = './images/tnt.png';
    this.#context.drawImage(BlowMine.#blowImage, this.#xDynamite, this.#yDynamite);
  }


  draw() {
    
    if (this.#counter % 2 && this.#counter <= 8) {
      this.drawTNT();
    } else {
      this.drawBag();
    }

    this.#counter++;
    return this.#counter > 8 ? true : false;
  }

  drawTNT() {
    BlowMine.#blowImage.src = './images/tnt.png';
    this.#context.drawImage(BlowMine.#blowImage, this.#xDynamite, this.#yDynamite);
  }

  drawBag() {
    BlowMine.#blowImage.src = './images/bag.png';
    this.#context.drawImage(BlowMine.#blowImage, this.#xBag, this.#yBag);
  }
}