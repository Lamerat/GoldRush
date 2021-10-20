export class Score {
  static #livesImage = new Image();
  static #increaseInterval = 100;
  static #goldScore = 400;

  #context;
  #score = 0;
  #hiScore = 0;
  #bonus = 0;
  #increaseValue = 20;
  #lives = 2;
  #finishCalculation = true;
  #levelImages = [];
  #nextImage = 10;

  #timer;
  #targetScore;

  get finishCalculation() {
    return this.#finishCalculation;
  }

  constructor(canvas) {
    Score.#livesImage.src = './images/player.png';
    this.#context = canvas;
    this.#context.font ='20px Arial';
  }

  addLevelImage(image) {
    const img = new Image();
    img.src = image;
    this.#levelImages.push({image: img, xPos: this.#nextImage});
    const xPos = this.#nextImage + img.width + 2;
    this.#nextImage = xPos;
  }

  scoreFormat(value) {
    const missing = 6 - value.toString().length;
    return '0'.repeat(missing) + value;
  }

  draw() {
    this.#context.fillStyle = '#9400D3';
    this.#context.fillText('SCORE', 10, 525);
    this.#context.fillText('HI-SCORE', 774, 525);
    this.#context.fillText(this.#lives, 827, 582);

    this.#context.fillStyle = 'green';
    this.#context.fillText(this.scoreFormat(this.#score), 10, 550);
    this.#context.fillText(this.scoreFormat(this.#hiScore), 805, 550);

    this.#context.drawImage(Score.#livesImage, 845, 560, 24, 30);

    this.#levelImages.forEach(el => {
      const height = el.image.height - 5;
      const width = (el.image.width / el.image.height) * height;
      this.#context.drawImage(el.image, el.xPos, 560, width, height);
    })
  }

  updateScore(bonus = 0) {
    this.#increaseValue = 20;
    this.#finishCalculation = false;
    this.#bonus = bonus;
    this.#targetScore = this.#score + Score.#goldScore;
    this.#timer = setInterval(() => this.endScore(), Score.#increaseInterval);
  }

  endScore() {
    this.#score = this.#score + this.#increaseValue;
    if (this.#targetScore === this.#score) {
      clearInterval(this.#timer);
      this.#increaseValue = 10;

      if (this.#bonus === 0) {
        this.#finishCalculation = true;
        return;
      }

      this.#targetScore = this.#score + this.#bonus;
      this.#bonus = 0;
      setTimeout(() => this.#timer = setInterval(() => this.endScore(), Score.#increaseInterval), 600);
    }
  }
}