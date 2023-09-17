import { checkForRepeats, boardLocatorInfo, eraseAndRedraw, correctKaraRotation, objectAt, updateTile } from "./board.js";
import { getKaraX, getKaraY, getDirection, changeDirection, changeKaraLocation, karaPlaced, addLeaf, useLeaf, getLeaves} from "./kara.js";

const upArrow = document.getElementById('upArrow');
const rotateRightArrow = document.getElementById('rotateRightArrow');
const rotateLeftArrow = document.getElementById('rotateLeftArrow');
const pickUpButton = document.getElementById('pickUpButton');
const putDownButton = document.getElementById('putDownButton');

upArrow.addEventListener('click', () => {
  moveKaraForward();
});

rotateRightArrow.addEventListener('click', () => {
  rotateRight();
});

rotateLeftArrow.addEventListener('click', () => {
  rotateLeft();
});

pickUpButton.addEventListener('click', () => {
  pickUpLeaf();
});

putDownButton.addEventListener('click', () => {
  placeLeaf();
});


export const rotateRight = () => {
  if(!karaPlaced) {
    alert('Kara is not placed');
    return false;
  }
  const direction = getDirection();
  if(direction >= 3) {
    changeDirection(0);
  } else {
    changeDirection(direction + 1);
  }
  correctKaraRotation();
}

export const rotateLeft = () => {
  if(!karaPlaced) {
    alert('Kara is not placed');
    return false;
  }
  const direction = getDirection();
  if(direction <= 0) {
    changeDirection(3);
  } else {
    changeDirection(direction - 1);
  }
  correctKaraRotation();
}

export const pickUpLeaf = () => {
  if(!karaPlaced) {
    alert('Kara is not placed');
    return false;
  }
  const objects = objectAt(getKaraX(), getKaraY());
  if (!objects.includes(3)) {
    alert('Kara is not on a leaf');
    return false;
  }
  updateTile(getKaraX(), getKaraY(), 'removeLeafOnly');
  addLeaf();
}

export const placeLeaf = () => {
  if(!karaPlaced) {
    alert('Kara is not placed');
    return false;
  }
  if (getLeaves() <= 0) {
    alert('Kara is holding no leaves.');
    return false;
  }
  const objects = objectAt(getKaraX(), getKaraY());
  if (objects.includes(3)) {
    alert('Leaf is already placed where kara is.');
    return false;
  }
  updateTile(getKaraX(), getKaraY(), 'add', 'leaf')
  useLeaf();
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

  const repeats = checkForRepeats(x, y, 'kara');
  if(repeats.status) {
    if(repeats.msg === 'shroom') {
      const shroomX = x + directionOffset[1] - directionOffset[3];
      const shroomY = y - directionOffset[0] + directionOffset[2];
      console.log(shroomX, shroomY);
      if(!(shroomX > (boardLocatorInfo.width - 1) || shroomX < 0 || shroomY > (boardLocatorInfo.height - 1) || shroomY < 0) && objectAt(shroomX, shroomY).length === 0) {
        eraseAndRedraw(x, y, shroomX, shroomY, 'mushroom');
      } else {
        alert('Kara cannot go there');
        return false;
      }
    } else {
      alert('Kara cannot go there');
      return false;
    }

  }
  console.log(x, y);
  eraseAndRedraw(getKaraX(), getKaraY(), x, y, 'kara');
  changeKaraLocation(x, y);
  correctKaraRotation();

  //

  //const repeat = checkForRepeats()
}