import { tileAtPxLocation, updateBoard, updateTile } from "../board.js";

const leaf = document.getElementById('leaf');

let isDragging = false;
let offsetX, offsetY;

document.ondragover = (e) => {
  e.preventDefault();
}

leaf.addEventListener("dragstart", (e) => {
  isDragging = true;
  offsetX = e.clientX - leaf.getBoundingClientRect().left;
  offsetY = e.clientY - leaf.getBoundingClientRect().top;
  leaf.style.cursor = "grabbing";
});

leaf.addEventListener("drag", (e) => {
  if (isDragging) {
    leaf.style.left = e.clientX - offsetX + 'px';
    leaf.style.top = e.clientY - offsetY + 'px';
  }
});

leaf.addEventListener("dragend", (e) => {
    if (isDragging) {
      // Reset cursor style
      leaf.style.cursor = "pointer";

      // Restore leaf's original position
      leaf.style.left = 'auto';
      leaf.style.top = 'auto';

      isDragging = false;
    }
    const coords = tileAtPxLocation(e.clientX, e.clientY);
    if (coords) {
      updateTile(coords.tileIndexX, coords.tileIndexY, 'add', 'leaf');
    }
});
