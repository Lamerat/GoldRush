export class BlowMine {
  static #blowImage = new Image();
  #counter = 1;
  #context;
  #xBag;
  #yBag;
  #xDynamite;
  #yDynamite;
  
  constructor(canvas, position) {
    this.#context = canvas;
    this.#xBag = position.x;
    this.#yBag = position.y;
    this.#xDynamite = position.x - 20;
    this.#yDynamite = position.y - 12;
    BlowMine.#blowImage.src = './images/tnt.png';
    this.#context.drawImage(BlowMine.#blowImage, this.#xDynamite, this.#yDynamite);
  }


  draw() {
    if (this.#counter % 2) {
      BlowMine.#blowImage.src = './images/tnt.png';
      this.#context.drawImage(BlowMine.#blowImage, this.#xDynamite, this.#yDynamite);
    } else {
      BlowMine.#blowImage.src = './images/bag.png';
      this.#context.drawImage(BlowMine.#blowImage, this.#xBag, this.#yBag);
    }

    this.#counter++;
    
    return this.#counter;
  }  
}