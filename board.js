const board = document.getElementById('board');
const boardContainer = document.getElementById('board-container');

const tiles = [];

const boardLocatorInfo = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  tileSize: 0
}
console.log(boardLocatorInfo);
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

function checkForRepeats(tileIndexX, tileIndexY, theoreticalObject) {
  const instances = [0, 0, 0, 0];
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
      return true;
    }
  };
  if ((objectsCount > 1) && !(instances[0] === 1 && instances[1] === 0 && instances[2] === 1 && instances[3] === 0)) {
    return true;
  }
  return false;
}

export function updateTile (tileIndexX, tileIndexY, operation, object = null) {
  const tile = tiles[tileIndexY][tileIndexX].tile;
  if (tile) {
    if(operation === 'add' && object) {
      if(checkForRepeats(tileIndexX, tileIndexY, object)){
        return false;
      }
      const img = document.createElement('img');
      img.classList.add('tile-object');
      img.style.height = `${boardLocatorInfo.tileSize}px`
      switch (object) {
        case 'kara':
          img.src = './icons/kara.png';
          tiles[tileIndexY][tileIndexX].current.push(1);
          img.style.zIndex = 99;
          break;
        case 'mushroom':
          console.log('hi');
          img.src = './icons/mushroom.png';
          tiles[tileIndexY][tileIndexX].current.push(2);
          break;
        case 'leaf':
          img.src = './icons/leaf.png';
          img.style.zIndex = 0;
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
        tiles[tileIndexY][tileIndexX].current = [];
        while (tiles[tileIndexY][tileIndexX].tile.firstChild) {
          tiles[tileIndexY][tileIndexX].tile.removeChild(tiles[tileIndexY][tileIndexX].tile.firstChild);
      }
      })
      img.style.height = `${boardLocatorInfo.tileSize -10}px`;
      console.log(tiles);
      tile.appendChild(img);
    }
  }
};

export function updateBoard(height, width){
  const sizeLimit = Math.floor(height >= width ? boardContainer.offsetHeight / height : boardContainer.offsetWidth / width) - 7;
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