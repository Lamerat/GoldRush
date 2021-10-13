import { Game } from './Classes/Game.js';
import { gameActions } from './common/game-actions.js';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const game = new Game(context);

// const backgroundImage = new Image();
// backgroundImage.src = './background.png';
// backgroundImage.onload = () => context.drawImage(backgroundImage, 0, 0);

// const playerImage = new Image();
// playerImage.src = './player.png';

// playerImage.onload = () => context.drawImage(playerImage, 775, 250);



document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    game.actions(gameActions.LEFT_START);
  }

  if (event.key === 'ArrowRight') {
    game.actions(gameActions.RIGHT_START);
  }

  if (event.key === 'ArrowUp') {
    game.actions(gameActions.UP_START);
  }

  if (event.key === 'ArrowDown') {
    game.actions(gameActions.DOWN_START);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    game.actions(gameActions.LEFT_STOP);
  }

  if (event.key === 'ArrowRight') {
    game.actions(gameActions.RIGHT_STOP);
  }

  if (event.key === 'ArrowUp') {
    game.actions(gameActions.UP_STOP);
  }

  if (event.key === 'ArrowDown') {
    game.actions(gameActions.DOWN_STOP);
  }
});


game.interval = setInterval(() => game.frame(), 1000.0/60.0);