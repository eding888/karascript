import { checkForRepeats, boardLocatorInfo, eraseAndRedraw } from "./board.js";
import { getKaraX, getKaraY, getDirection, changeKaraLocation } from "./kara.js";

const upArrow = document.getElementById('upArrow');

upArrow.addEventListener('click', () => {
  moveKaraForward();
});

export const moveKaraForward = () => {
  // 0 - north
  // 1 - east
  // 2 - south
  // 3 - west
  const directionOffset = [0, 0, 0, 0];
  const direction = getDirection();
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
  const y =  getKaraY() + directionOffset[0] - directionOffset[2];
  console.log(x, y);
  eraseAndRedraw(getKaraX(), getKaraY(), x, y, 'kara');
  changeKaraLocation(x, y);

  //if(x > boardLocatorInfo.)

  //const repeat = checkForRepeats()
}