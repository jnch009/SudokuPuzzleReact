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

function checkColElementsExist(grid,col){
    for (var row = 0; row < 9; row += 1) {
      if (grid[row][col] !== null) {
        return true;
      }
    }
    return false;
}

function updateBoxGrid(boxGrid, valuetoInsert, indexToInsert) {
    boxGrid[indexToInsert] = valuetoInsert;
    for (var i = 0; i < boxGrid.length; i++){
      let box = boxGrid[i];
      if (box === null || box.length === undefined){
        continue;
      } else {
        if (box.indexOf(valuetoInsert) !== -1){
          box.splice(box.indexOf(valuetoInsert),1);
        }
        boxGrid[i] = box;
      }
    }
}

function intersectArrays(arr1,arr2){
    var concat = arr1.concat(arr2);
    concat = concat.filter((item, index) => concat.indexOf(item) !== index);
    return concat;
}

export default {
    randomlyGeneratedValue,
    checkCol,
    checkRow,
    checkConditions,
    checkColElementsExist,
    updateBoxGrid,
    intersectArrays
}