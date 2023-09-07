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

updateBoard(10, 20);

function tileAtPxLocation(x, y) {
  const upperBound = boardLocatorInfo.y;
  const lowerBound = upperBound - (boardLocatorInfo.tileSize * boardLocatorInfo.height);

  const leftBound = boardLocatorInfo.x;
  const rightBound = boardLocatorInfo.x + (boardLocatorInfo.tileSize * boardLocatorInfo.width)
}

function updateBoard(height, width){
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
}