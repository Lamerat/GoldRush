import { Bear } from '../Classes/Bear.js';
import { ClaimJumper } from '../Classes/ClaimJumper.js';
import { Indian } from '../Classes/Indian.js';
import { Solider } from '../Classes/Solider.js';
import { TOOLS } from './images-path.js';

export const gameLevels = {
  1: {
    movingObjects: [
      (context, level) => new Indian (context, level),
      (context, level) => new Bear (context, level),
      (context, level) => new Solider (context, level),
      (context, level) => new ClaimJumper (context, level),
    ],
    tool: TOOLS.SHOVEL,
  },
  
  2: {
    movingObjects: [
      (context, level) => new Bear (context, level),
    ],
  }
}


