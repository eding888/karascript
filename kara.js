export let karaPlaced = false;
let direction = 0;
let karaLocation = [0, 0];
// 0 - north
// 1 - east
// 2 - south
// 3 - west
export const changeKaraPlaced = (state) => {
  karaPlaced = state;
};

export const changeDirection = (direction) => {
  this.direction = direction;
}

export const changeKaraLocation = (x, y) => {
  this.karaLocation[0] = x;
  this.karaLocation[1] = y;
}

export const getKaraX = () => {
  return karaLocataion[0];
}

export const getKaraY = () => {
  return karaLocataion[1];
}