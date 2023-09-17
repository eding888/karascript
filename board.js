const board = document.getElementById('board');
const boardContainer = document.getElementById('board-container');
const resize = document.getElementById('resize');

import { changeKaraPlaced, getDirection, changeDirection } from "../kara.js";
import { getKaraX, getKaraY } from "./kara.js";

let tiles = [];

let firstRow = null;

resize.addEventListener('click', () => {
  let x = prompt('Input X Size');
  let y = prompt('Input Y Size');
  if(x > 25) {
    x = 25;
  } else if (x < 5) {
    x = 5;
  }

  if(y > 25) {
    y = 25;
  } else if (y < 5) {
    y = 5;
  }
  updateBoard(y, x);
})

export const boardLocatorInfo = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  tileSize: 0
};

export function objectAt(x, y) {
  return tiles[y][x].current;
};

export function eraseAndRedraw(targetX, targetY, newX, newY, newObject) {
  updateTile(targetX, targetY, newObject === 'kara' ? 'removeKaraOnly' : 'remove');
  updateTile(newX, newY, 'add', newObject);
};

export function correctKaraRotation() {
  let angle = 0;
  const x = getKaraX();
  const y = getKaraY();
  const karaId = tiles[y][x].tile.querySelector('#kara');
  if (karaId) {
    console.log(getDirection());
    switch (getDirection()) {
      case 0:
        angle = 270;
        break;
      case 1:
        angle = 0;
        break;
      case 2:
        angle = 90;
        break;
      case 3:
        angle = 180;
        break;
      default:
        break;
    }
    karaId.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  }
}

export function tileAtPxLocation(x, y) {
  const upperBound = boardLocatorInfo.y;
  const lowerBound = upperBound + (boardLocatorInfo.tileSize * boardLocatorInfo.height);

  const leftBound = boardLocatorInfo.x;
  const rightBound = boardLocatorInfo.x + (boardLocatorInfo.tileSize * boardLocatorInfo.width)

  if(((x < leftBound) || (x > rightBound)) || ((y < upperBound) || (y > lowerBound))) {
    return null;
  }
  const relX = x - boardLocatorInfo.x;
  const relY = y - boardLocatorInfo.y;

  const tileIndexX = Math.ceil(relX / boardLocatorInfo.tileSize) - 1;
  const tileIndexY = Math.ceil(relY / boardLocatorInfo.tileSize) - 1;

  return(
    {
      tileIndexX,
      tileIndexY
    }
  )
};

export function checkForRepeats(tileIndexX, tileIndexY, theoreticalObject) {
  const instances = [0, 0, 0, 0];
  if (!tiles[tileIndexY][tileIndexX]) {
    return { status: false, msg: 'good' };
  };
  for (let i = 0; i< tiles[tileIndexY][tileIndexX].current.length; i++) {
    switch (tiles[tileIndexY][tileIndexX].current[i]) {
      case 1:
        instances[0] +=1;
        break;
      case 2:
        instances[1] +=1;
        break;
      case 3:
        instances[2] +=1;
        break;
      case 4:
        instances[3] +=1;
        break;
      default:
        break;
    }
  }
  switch (theoreticalObject) {
    case 'kara':
      instances[0] += 1
      break;
    case 'mushroom':
      instances[1] += 1
      break;
    case 'leaf':
      instances[2] += 1
      break;
    case 'tree':
      instances[3] += 1
      break;
    default:
      break;
  }
  let objectsCount = 0;
  for(let i = 0; i < instances.length; i++) {
    if(instances[i] === 1){
      objectsCount += 1;
    }
    if (instances[i] > 1) {
      return { status: true, msg: 'multiple of same' };
    }
  };
  if ((objectsCount > 1) && (instances[0] === 1 && instances[1] === 0 && instances[2] === 0 && instances[3] === 1)) {
    return { status: true, msg: 'log' };
  }
  else if ((objectsCount > 1) && (instances[0] === 1 && instances[1] === 1 && instances[2] === 0 && instances[3] === 0)) {
    return { status: true, msg: 'shroom' };
  }
  else if ((objectsCount > 1) && !(instances[0] === 1 && instances[1] === 0 && instances[2] === 1 && instances[3] === 0)) {
    return { status: true, msg: 'multi objects' };
  }
  return { status: false, msg: 'good' };
}

export function updateTile (tileIndexX, tileIndexY, operation, object = null) {
  const tile = tiles[tileIndexY][tileIndexX].tile;
  if (tile) {
    if(operation === 'add' && object) {
      console.log(checkForRepeats(tileIndexX, tileIndexY, object).status);
      if(checkForRepeats(tileIndexX, tileIndexY, object).status){
        return false;
      }
      const img = document.createElement('img');
      img.classList.add('tile-object');
      img.style.height = `${boardLocatorInfo.tileSize}px`
      let kara = false;
      switch (object) {
        case 'kara':
          img.src = './icons/kara.png';
          tiles[tileIndexY][tileIndexX].current.push(1);
          img.id = 'kara';
          img.style.zIndex = 99;
          kara = true;
          break;
        case 'mushroom':
          console.log('hi');
          img.src = './icons/mushroom.png';
          tiles[tileIndexY][tileIndexX].current.push(2);
          break;
        case 'leaf':
          img.src = './icons/leaf.png';
          img.style.zIndex = 0;
          img.id = 'leaf';
          tiles[tileIndexY][tileIndexX].current.push(3);
          break;
        case 'tree':
          img.src = './icons/tree.png';
          tiles[tileIndexY][tileIndexX].current.push(4);
          break;
        default:
          break;
      }
      img.addEventListener('click', () => {
        if(kara) changeKaraPlaced(false);
        tiles[tileIndexY][tileIndexX].current = [];
        while (tiles[tileIndexY][tileIndexX].tile.firstChild) {
          tiles[tileIndexY][tileIndexX].tile.removeChild(tiles[tileIndexY][tileIndexX].tile.firstChild);
        }
      })
      img.style.height = `${boardLocatorInfo.tileSize -10}px`;
      console.log(tiles);
      tile.appendChild(img);
    } else if (operation === 'removeKaraOnly') {
        const karaId = tiles[tileIndexY][tileIndexX].tile.querySelector('#kara');
        if(karaId){
          tiles[tileIndexY][tileIndexX].tile.removeChild(karaId);
        }
        tiles[tileIndexY][tileIndexX].current = tiles[tileIndexY][tileIndexX].current.filter(item => item !== 1);
    } else if (operation === 'removeLeafOnly') {
        const leafId = tiles[tileIndexY][tileIndexX].tile.querySelector('#leaf');
        if(leafId){
          tiles[tileIndexY][tileIndexX].tile.removeChild(leafId);
        }
        tiles[tileIndexY][tileIndexX].current = tiles[tileIndexY][tileIndexX].current.filter(item => item !== 3);
    } else if (operation === 'remove') {
        tiles[tileIndexY][tileIndexX].current = [];
        while (tiles[tileIndexY][tileIndexX].tile.firstChild) {
          tiles[tileIndexY][tileIndexX].tile.removeChild(tiles[tileIndexY][tileIndexX].tile.firstChild);
        }
    }
  }
};

export function updateBoard(height, width){
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  changeKaraPlaced(false);
  changeDirection(1);
  tiles = [];
  console.log( boardContainer.offsetHeight / height, height, width);
  const sizeLimit = Math.floor(parseInt(height) >= parseInt(width) ? boardContainer.offsetHeight / height : boardContainer.offsetWidth / width) - 7;
  console.log(sizeLimit);
  board.style.height = `${(sizeLimit + 2) * height}px`;
  board.style.width = `${(sizeLimit + 2) * width}px`;
  for(let i = 0; i < height; i++){
    const tileRow = [];
    const row = document.createElement('div');
    for(let i = 0; i < width; i++){
        const item = document.createElement('div');
        item.classList.add("tile");
        item.style.height = `${sizeLimit}px`;
        row.appendChild(item);
        tileRow.push(
          {
            tile: item,
            current: []
          }
        );
    }
    tiles.push(tileRow);
    row.classList.add("row");
    board.appendChild(row);
    if (i === 0) {
      const rect = row.getBoundingClientRect();
      firstRow = row;
      boardLocatorInfo.x = rect.x;
      boardLocatorInfo.y = rect.y;
      boardLocatorInfo.height = height;
      boardLocatorInfo.width = width;
      boardLocatorInfo.tileSize = sizeLimit + 2;
    }
  }
  console.log(tiles);
  console.log(boardLocatorInfo);
};

let lastScrollY = window.scrollY;
let lastScrollX = window.scrollX;
window.addEventListener("scroll", () => {
  boardLocatorInfo.y -= window.scrollY - lastScrollY;
  boardLocatorInfo.x -= window.scrollX - lastScrollX;
  lastScrollY = window.scrollY;
  lastScrollX = window.scrollX;
});