function randomlyGeneratedValue(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function insertIntoCol(grid, colNumber, valueToAdd){
    for (var row = 0; row < 9; row += 1) {
      if (grid[row][colNumber] === valueToAdd) {
        return false;
      }
    }
    return true;
}

function insertIntoRow(grid, rowNumber, valueToAdd){
    if (grid[rowNumber].indexOf(valueToAdd) !== -1) {
      return false;
    }
    return true;
}

//new function ensureGridSatisfied
//new functions: verifyRow, verifyColumn, verifyBox

function verifyRow(grid, rowNumber){
    var rowCopy = grid[rowNumber].filter(function(val,i){
        return grid[rowNumber].indexOf(val) >= i;
    });

    return rowCopy.length === grid[rowNumber].length;
}

function insertConstraint(grid,rowNumber,colNumber,valueToAdd){
    if (!insertIntoRow(grid,rowNumber,valueToAdd) || !insertIntoCol(grid,colNumber,valueToAdd)){
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

function arrayLengths(arr) {
    var arrResult = [];
    arr.forEach((v,i)=>{
        arrResult.push(v.length);
    });
    return arrResult;
}

function scanGrid(boxGrid, tempGrid){
    var arrOfLengths = arrayLengths(boxGrid);
    var index;
    var boxOfInterest;

    while (tempGrid.filter(x=>x !== null).length < 9) {
      index = arrOfLengths.findIndex(function(x){
        var tmp = arrOfLengths.filter(x=>x !== undefined);
        return x === Math.min(...tmp);
      });
      boxOfInterest = boxGrid[index];
      tempGrid[index] = boxOfInterest[0];
      updateBoxGrid(boxGrid,tempGrid[index],index);
      arrOfLengths = arrayLengths(boxGrid);
    }

    return tempGrid;
}

function generateValidEntries(boxGrid, entries, beginRow, beginCol, newGrid){
    var columnInsert = false;
    var bothColumnRowInsert = false;

    if (newGrid[beginRow].every(function(x){
      return x === null;
    })) {
      columnInsert = true;
    } else if (checkColElementsExist(newGrid,beginCol)){
      bothColumnRowInsert = true;
    }

    var entryIndex;
    var boxIndex = 0;
    for (var row = beginRow; row < beginRow+3; row++){
      for (var col = beginCol; col < beginCol+3; col++){
        entryIndex = 0;
        while (entryIndex < 9) {
          if (insertConstraint(newGrid,row,col,entries[entryIndex])){
              boxGrid[boxIndex].push(entries[entryIndex]);
          }
          entryIndex+=1;
        }
        if (boxGrid[boxIndex].length === 0){
          return [];
        }
        boxIndex += 1;
      }
    }

    var concatResult = [];
    var row1Entries;
    var row2Entries;
    var row3Entries;
    var concatRows;
    if (bothColumnRowInsert){
        var tempGrid = Array(9).fill(null);
        scanGrid(boxGrid,tempGrid);
        concatResult = tempGrid;
    }

    else if (!columnInsert) {
      if (boxGrid.every(function(x){
          return x.length === 3;
      })){
          tempGrid = Array(9).fill(null);
          scanGrid(boxGrid,tempGrid);
          concatResult = tempGrid;
      } else {
          row1Entries = intersectArrays(boxGrid[0],boxGrid[3]);
          row2Entries = intersectArrays(boxGrid[3],boxGrid[6]);
          concatRows = row1Entries.concat(row2Entries);
          row3Entries = entries.filter(x=>!concatRows.includes(x));
          concatResult = row1Entries.concat(row2Entries);
          concatResult = concatResult.concat(row3Entries);
      }
    } 
    else {
      if (boxGrid.every(function(x){
        return x.length === 3;
      })){
        tempGrid = Array(9).fill(null);
        scanGrid(boxGrid,tempGrid);
        concatResult = tempGrid;
      } else {
        row1Entries = intersectArrays(boxGrid[0],boxGrid[1]);
        row2Entries = intersectArrays(boxGrid[1],boxGrid[2]);
        concatRows = row1Entries.concat(row2Entries);
        row3Entries = entries.filter(x=>!concatRows.includes(x));
        for (var i = 0; i < 3; i++){
          concatResult.push(row1Entries[i]);
          concatResult.push(row2Entries[i]);
          concatResult.push(row3Entries[i]);
        }
      }
    }
    
    return concatResult;
  }

export default {
    randomlyGeneratedValue,
    checkCol,
    checkRow,
    checkConditions,
    checkColElementsExist,
    updateBoxGrid,
    intersectArrays,
    scanGrid,
    arrayLengths,
    generateValidEntries,
    verifyRow
}