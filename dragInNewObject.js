import { tileAtPxLocation, updateBoard, updateTile } from "./board.js";

const kara = document.getElementById('kara');

let karaPlaced = false;
let isDragging = false;
let offsetX, offsetY;

document.ondragover = (e) => {
  e.preventDefault();
}

kara.addEventListener("dragstart", (e) => {
  if(!karaPlaced) {
    console.log(e);
    isDragging = true;
    offsetX = e.clientX - kara.getBoundingClientRect().left;
    offsetY = e.clientY - kara.getBoundingClientRect().top;
    kara.style.cursor = "grabbing";
  }
});

kara.addEventListener("drag", (e) => {
  if (isDragging && !karaPlaced) {
    // Update kara's position to follow the cursor
    kara.style.left = e.clientX - offsetX + 'px';
    kara.style.top = e.clientY - offsetY + 'px';
  }
});

kara.addEventListener("dragend", (e) => {
  if(!karaPlaced) {
    if (isDragging) {
      // Reset cursor style
      kara.style.cursor = "pointer";

      // Restore kara's original position
      kara.style.left = 'auto';
      kara.style.top = 'auto';

      isDragging = false;
    }
    const coords = tileAtPxLocation(e.clientX, e.clientY);
    if (coords) {
      updateTile(coords.tileIndexX, coords.tileIndexY);
    }
    karaPlaced = true;
  }
});

updateBoard(8, 8);
