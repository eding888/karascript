const board = document.getElementById('board');
const boardContainer = document.getElementById('board-container');
const tiles = [];
updateBoard(10, 20);

function updateBoard(height, width){
  const sizeLimit = Math.floor(height >= width ? boardContainer.offsetHeight / height : boardContainer.offsetWidth / width) - 5;
  console.log(sizeLimit);
  board.style.height = `${sizeLimit * height}px`;
  board.style.width = `${sizeLimit * width}px`;
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
  }
  console.log(tiles);
}