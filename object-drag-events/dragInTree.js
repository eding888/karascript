import { tileAtPxLocation, updateBoard, updateTile } from "../board.js";

const tree = document.getElementById('tree');

let isDragging = false;
let offsetX, offsetY;

document.ondragover = (e) => {
  e.preventDefault();
}

tree.addEventListener("dragstart", (e) => {
  isDragging = true;
  offsetX = e.clientX - tree.getBoundingClientRect().left;
  offsetY = e.clientY - tree.getBoundingClientRect().top;
  tree.style.cursor = "grabbing";
});

tree.addEventListener("drag", (e) => {
  if (isDragging) {
    tree.style.left = e.clientX - offsetX + 'px';
    tree.style.top = e.clientY - offsetY + 'px';
  }
});

tree.addEventListener("dragend", (e) => {
    if (isDragging) {
      // Reset cursor style
      tree.style.cursor = "pointer";

      // Restore tree's original position
      tree.style.left = 'auto';
      tree.style.top = 'auto';

      isDragging = false;
    }
    const coords = tileAtPxLocation(e.clientX, e.clientY);
    if (coords) {
      updateTile(coords.tileIndexX, coords.tileIndexY, 'add', 'tree');
    }
});
