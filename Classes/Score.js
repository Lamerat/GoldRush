export class Score {
  static #livesImage = new Image();
  static #goldScore = 400;

  #context;
  #score = 0;
  #hiScore = 0;
  #lives = 2;

  #timer;
  #targetScore;

  constructor(canvas) {
    Score.#livesImage.src = './images/player.png';
    this.#context = canvas;
    this.#context.font ='20px Arial';
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
  }

  updateScore(bonus = 0) {
    this.#targetScore = this.#score + Score.#goldScore + bonus;
    this.#timer = setInterval(() => this.endScore(), 100);
  }

  endScore() {
    this.#score = this.#score + 20;
    if (this.#targetScore === this.#score) {
      clearInterval(this.#timer);
    }
  }
}