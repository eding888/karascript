import { tileAtPxLocation, updateBoard, updateTile } from "./board.js";

document.addEventListener('click', function(event) {
  const coords = tileAtPxLocation(event.clientX, event.clientY);
  if (coords) {
    updateTile(coords.tileIndexX, coords.tileIndexY);
  }
});
updateBoard(10, 20);
