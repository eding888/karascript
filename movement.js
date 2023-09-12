import { checkForRepeats, boardLocatorInfo, eraseAndRedraw, correctKaraRotation } from "./board.js";
import { getKaraX, getKaraY, getDirection, changeDirection, changeKaraLocation, karaPlaced } from "./kara.js";

const upArrow = document.getElementById('upArrow');
const rotateRightArrow = document.getElementById('rotateRightArrow');
const rotateLeftArrow = document.getElementById('rotateLeftArrow');

upArrow.addEventListener('click', () => {
  moveKaraForward();
});

rotateRightArrow.addEventListener('click', () => {
  rotateRight();
})

rotateLeftArrow.addEventListener('click', () => {
  rotateLeft();
})


export const rotateRight = () => {
  const direction = getDirection();
  if(direction >= 3) {
    changeDirection(0);
  } else {
    changeDirection(direction + 1);
  }
  correctKaraRotation();
}

export const rotateLeft = () => {
  const direction = getDirection();
  if(direction <= 0) {
    changeDirection(3);
  } else {
    changeDirection(direction - 1);
  }
  correctKaraRotation();
}

export const moveKaraForward = () => {
  // 0 - north
  // 1 - east
  // 2 - south
  // 3 - west
  if(!karaPlaced) {
    alert('Kara is not placed');
    return false;
  }
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
  const y =  getKaraY() - directionOffset[0] + directionOffset[2];
  if(x > (boardLocatorInfo.width - 1) || x < 0 || y > (boardLocatorInfo.height - 1) || y < 0) {
    alert('Kara out of bounds');
    return false;
  }
  console.log(x, y);
  eraseAndRedraw(getKaraX(), getKaraY(), x, y, 'kara');
  changeKaraLocation(x, y);
  correctKaraRotation();

  //

  //const repeat = checkForRepeats()
}