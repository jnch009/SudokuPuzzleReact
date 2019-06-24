function randomlyGeneratedValue(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkCol(grid, colNumber, valueToAdd){
    for (var row = 0; row < 9; row += 1) {
      if (grid[row][colNumber] === valueToAdd) {
        return false;
      }
    }
    return true;
}

export default {
    randomlyGeneratedValue,
    checkCol
}