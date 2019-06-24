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

function checkRow(grid, rowNumber, valueToAdd){
    if (grid[rowNumber].indexOf(valueToAdd) !== -1) {
      return false;
    }
    return true;
}

function checkConditions(valueToAdd,rowNumber,colNumber,grid){
    if (!checkRow(grid,rowNumber,valueToAdd) || !checkCol(grid,colNumber,valueToAdd)){
      return false;
    }
    return true;
  }

export default {
    randomlyGeneratedValue,
    checkCol,
    checkRow,
    checkConditions
}