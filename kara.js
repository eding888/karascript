export let karaPlaced = false;
let direction = 1;
let leavesInventory = 0;
let karaLocation = [0, 0];
// 0 - north
// 1 - east
// 2 - south
// 3 - west
export const changeKaraPlaced = (state) => {
  karaPlaced = state;
};

export const changeDirection = (dir) => {
  direction = dir;
}

export const getDirection = () => {
  return direction;
}

export const changeKaraLocation = (x, y) => {
  karaLocation[0] = x;
  karaLocation[1] = y;
}

export const getLeaves = () => {
  return leavesInventory;
};

export const useLeaf = () => {
  leavesInventory -= 1;
};


export const addLeaf = () => {
  leavesInventory += 1;
};

export const getKaraX = () => {
  return karaLocation[0];
}

export const getKaraY = () => {
  return karaLocation[1];
}