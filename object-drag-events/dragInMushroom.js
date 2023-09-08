import { tileAtPxLocation, updateBoard, updateTile } from "../board.js";

const mushroom = document.getElementById('mushroom');

let isDragging = false;
let offsetX, offsetY;

document.ondragover = (e) => {
  e.preventDefault();
}

mushroom.addEventListener("dragstart", (e) => {
  isDragging = true;
  offsetX = e.clientX - mushroom.getBoundingClientRect().left;
  offsetY = e.clientY - mushroom.getBoundingClientRect().top;
  mushroom.style.cursor = "grabbing";
});

mushroom.addEventListener("drag", (e) => {
  if (isDragging) {
    mushroom.style.left = e.clientX - offsetX + 'px';
    mushroom.style.top = e.clientY - offsetY + 'px';
  }
});

mushroom.addEventListener("dragend", (e) => {
    if (isDragging) {
      // Reset cursor style
      mushroom.style.cursor = "pointer";

      // Restore mushroom's original position
      mushroom.style.left = 'auto';
      mushroom.style.top = 'auto';

      isDragging = false;
    }
    const coords = tileAtPxLocation(e.clientX, e.clientY);
    if (coords) {
      updateTile(coords.tileIndexX, coords.tileIndexY, 'add', 'mushroom');
    }
});
