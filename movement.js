import { checkForRepeats } from "./board";
import { getKaraX, getKaraY } from "./kara";
import { boardLocatorInfo } from "./board";
export const moveKara = (direction) => {
  // 0 - north
  // 1 - east
  // 2 - south
  // 3 - west
  const directionOffset = [0, 0, 0, 0];
  switch (direction) {
    case 0:
      directionOffset[0] += 1
      break;
    case 1:
      directionOffset[1] += 1
      break;
    case 2:
      directionOffset[2] += 1
      break;
    case 3:
      directionOffset[3] += 1
      break;
    default:
      directionOffset[0] += 1
      break;
  }
  const x = getKaraX() + directionOffset[1] - directionOffset[3];
  const y =  getKaraY() + directionOffset[0] - directionOffset[4];

  //if(x > boardLocatorInfo.)

  const repeat = checkForRepeats()
}