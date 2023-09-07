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

export function updateTile (tileIndexX, tileIndexY) {
  const tile = tiles[tileIndexY][tileIndexX].tile;
  if (tile) {
    tile.style.backgroundColor = 'green';
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
            current: [0]
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