import { tileAtPxLocation, updateBoard, updateTile } from "./board.js";

const kara = document.getElementById('kara');
let karaPlaced = false;

const rect = kara.getBoundingClientRect();
const karaOriginalPostionTop = rect.top;
const karaOriginalPostionLeft = rect.left;
console.log(karaOriginalPostionTop, karaOriginalPostionLeft)

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
      kara.style.left = `${karaOriginalPostionLeft}px`;
      kara.style.top = `${karaOriginalPostionTop}px`;

      isDragging = false;
    }
    const coords = tileAtPxLocation(event.clientX, event.clientY);
    if (coords) {
      updateTile(coords.tileIndexX, coords.tileIndexY);
    }
    karaPlaced = true;
  }
});

updateBoard(10, 20);
