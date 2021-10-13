export class MobileObject {
  #image = new Image();
  
  #context;
  #xPos;
  #yPos;
  #objectWidth;
  #objectHeight;
  #moveStep = 3;
  #points = [];
  #nextIndex = 0;
  #xIsOk = false;
  #yIsOk = false;


  constructor(canvas, imageSource, startX, startY, points) {
    this.#context = canvas;
    this.#image.src = imageSource;
    this.#xPos = startX;
    this.#yPos = startY;
    this.#points = points;
  }

  update() {
    const nextX = this.#points[this.#nextIndex][0];
    const nextY = this.#points[this.#nextIndex][1];

    

    if (this.#xPos > nextX && !this.#xIsOk) {
      this.#xPos = this.#xPos - this.#moveStep;
      if (this.#xPos <= nextX) {
        this.#xIsOk = true;
      }
    }

    if (this.#xPos < nextX && !this.#xIsOk) {
      this.#xPos = this.#xPos + this.#moveStep;
      if (this.#xPos >= nextX) {
        this.#xIsOk = true;
      }
    }

    if (this.#yPos > nextY && !this.#yIsOk) {
      this.#yPos = this.#yPos - this.#moveStep;
      if (this.#yPos <= nextY) {
        this.#yIsOk = true;
      }
    }

    if (this.#yPos < nextY && !this.#yIsOk) {
      this.#yPos = this.#yPos + this.#moveStep;
      if (this.#yPos >= nextY) {
        this.#yIsOk = true;
      }
    }

    if (this.#xPos === nextX) {
      this.#xIsOk = true;
    }

    if (this.#yPos === nextY) {
      this.#yIsOk = true;
    }


    if (this.#xIsOk && this.#yIsOk) {
      if (this.#points.length - 1 === this.#nextIndex) {
        this.#nextIndex = 0;  
      } else {
        this.#nextIndex = this.#nextIndex + 1;
      }
      this.#xIsOk = false;
      this.#yIsOk = false;
    }
    
  }

  draw() {
    this.#context.drawImage(this.#image, this.#xPos, this.#yPos);
  }
}