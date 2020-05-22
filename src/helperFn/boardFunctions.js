function randomlyGeneratedValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function insertIntoCol(grid, colNumber, valueToAdd) {
  for (var row = 0; row < 9; row += 1) {
    if (parseInt(grid[row][colNumber]) === valueToAdd) {
      return false;
    }
  }
  return true;
}

function insertIntoRow(grid, rowNumber, valueToAdd) {
  if (grid[rowNumber].map(x => parseInt(x)).indexOf(valueToAdd) !== -1) {
    return false;
  }
  return true;
}

function insertIntoBox(grid, rowNumber, colNumber, valueToAdd) {
  for (var row = rowNumber; row < rowNumber + 3; row += 1) {
    for (var col = colNumber; col < colNumber + 3; col += 1) {
      if (parseInt(grid[row][col]) === valueToAdd) {
        return false;
      }
    }
  }
  return true;
}

function insertConstraint(grid, rowNumber, colNumber, valueToAdd) {
  if (
    !insertIntoRow(grid, rowNumber, valueToAdd) ||
    !insertIntoCol(grid, colNumber, valueToAdd)
  ) {
    return false;
  }
  return true;
}

//new function ensureGridSatisfied
//new functions: verifyRow (done), verifyColumn (done), verifyBox (done) (generateBox function)

function ensureGridSatisfied(grid) {
  var row;
  var col;
  // row
  for (row = 0; row < 9; row += 1) {
    if (verifyRow(grid, row) === false) {
      return false;
    }
  }

  // col
  for (col = 0; col < 9; col += 1) {
    if (verifyCol(grid, col) === false) {
      return false;
    }
  }

  // box
  for (row = 0; row <= 6; row += 3) {
    for (col = 0; col <= 6; col += 3) {
      if (verifyBox(grid, row, col) === false) {
        return false;
      }
    }
  }
  return true;
}

function ensureGridFilled(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
}

// const verifyRow = (grid, row, val) => {
//   if (grid[row].includes(val)) {
//     return false;
//   }
//   return true;
// };

// function verifyColumn(grid, colNumber) {
//   var columnEntries = [];
//   var columnCopy = [];
//   for (var row = 0; row < 9; row += 1) {
//     if (columnCopy.indexOf(parseInt(grid[row][colNumber])) === -1) {
//       columnCopy.push(grid[row][colNumber]);
//     }
//     columnEntries.push(grid[row][colNumber]);
//   }

//   return columnCopy.length === columnEntries.length;
// }

// function verifyBox(grid, rowNumber, colNumber) {
//   var boxEntries = [];
//   for (var row = rowNumber; row < rowNumber + 3; row += 1) {
//     for (var col = colNumber; col < colNumber + 3; col += 1) {
//       if (boxEntries.indexOf(grid[row][col]) === -1) {
//         boxEntries.push(grid[row][col]);
//       }
//     }
//   }

//   return boxEntries.length === 9;
// }

function checkColElementsExist(grid, col) {
  for (var row = 0; row < 9; row += 1) {
    if (grid[row][col] !== null) {
      return true;
    }
  }
  return false;
}

function updateBoxGrid(boxGrid, valuetoInsert, indexToInsert) {
  boxGrid[indexToInsert] = valuetoInsert;
  for (var i = 0; i < boxGrid.length; i++) {
    let box = boxGrid[i];
    if (box === null || box.length === undefined) {
      continue;
    } else {
      if (box.indexOf(valuetoInsert) !== -1) {
        box.splice(box.indexOf(valuetoInsert), 1);
      }
      boxGrid[i] = box;
    }
  }
}

function intersectArrays(arr1, arr2) {
  var concat = arr1.concat(arr2);
  concat = concat.filter((item, index) => concat.indexOf(item) !== index);
  return concat;
}

function arrayLengths(arr) {
  var arrResult = [];
  arr.forEach((v, i) => {
    arrResult.push(v.length);
  });
  return arrResult;
}

function scanGrid(boxGrid, tempGrid) {
  var boxEntries = boxGrid.filter(x => x.length !== 0).length;
  if (boxEntries !== 9) {
    tempGrid = [];
    return tempGrid;
  }

  let arrOfLengths = arrayLengths(boxGrid);
  let index;
  let boxOfInterest;

  while (tempGrid.filter(x => x !== null).length < 9) {
    let tmp = arrOfLengths.filter(x => x !== undefined);
    index = arrOfLengths.findIndex(function(x) {
      return x === Math.min(...tmp);
    });
    boxOfInterest = boxGrid[index];
    tempGrid[index] = boxOfInterest[0];
    updateBoxGrid(boxGrid, tempGrid[index], index);
    arrOfLengths = arrayLengths(boxGrid);
  }

  return tempGrid;
}

function generateValidEntries(boxGrid, entries, beginRow, beginCol, newGrid) {
  var columnInsert = false;
  var bothColumnRowInsert = false;

  if (
    newGrid[beginRow].every(function(x) {
      return x === null;
    })
  ) {
    columnInsert = true;
  } else if (checkColElementsExist(newGrid, beginCol)) {
    bothColumnRowInsert = true;
  }

  var entryIndex;
  var boxIndex = 0;
  for (var row = beginRow; row < beginRow + 3; row++) {
    for (var col = beginCol; col < beginCol + 3; col++) {
      entryIndex = 0;
      while (entryIndex < 9) {
        if (insertConstraint(newGrid, row, col, entries[entryIndex])) {
          boxGrid[boxIndex].push(entries[entryIndex]);
        }
        entryIndex += 1;
      }
      boxIndex += 1;
    }
  }

  var concatResult = [];
  var row1Entries;
  var row2Entries;
  var row3Entries;
  var concatRows;
  if (bothColumnRowInsert) {
    var tempGrid = Array(9).fill(null);
    scanGrid(boxGrid, tempGrid);
    concatResult = tempGrid;
  } else if (!columnInsert) {
    if (
      boxGrid.every(function(x) {
        return x.length === 3;
      })
    ) {
      tempGrid = Array(9).fill(null);
      scanGrid(boxGrid, tempGrid);
      concatResult = tempGrid;
    } else {
      row1Entries = intersectArrays(boxGrid[0], boxGrid[3]);
      row2Entries = intersectArrays(boxGrid[3], boxGrid[6]);
      concatRows = row1Entries.concat(row2Entries);
      row3Entries = entries.filter(x => !concatRows.includes(x));
      concatResult = row1Entries.concat(row2Entries);
      concatResult = concatResult.concat(row3Entries);
    }
  } else {
    if (
      boxGrid.every(function(x) {
        return x.length === 3;
      })
    ) {
      tempGrid = Array(9).fill(null);
      scanGrid(boxGrid, tempGrid);
      concatResult = tempGrid;
    } else {
      row1Entries = intersectArrays(boxGrid[0], boxGrid[1]);
      row2Entries = intersectArrays(boxGrid[1], boxGrid[2]);
      concatRows = row1Entries.concat(row2Entries);
      row3Entries = entries.filter(x => !concatRows.includes(x));
      for (var i = 0; i < 3; i++) {
        concatResult.push(row1Entries[i]);
        concatResult.push(row2Entries[i]);
        concatResult.push(row3Entries[i]);
      }
    }
  }

  return concatResult;
}

// this function satisfies box constraint
function generateBox(beginRow, beginCol, arrEntries, newGrid) {
  var indexing = 0;
  for (var row = beginRow; row < beginRow + 3; row++) {
    var col = beginCol;
    while (col < beginCol + 3) {
      newGrid[row].splice(col, 1, arrEntries[indexing]);
      col += 1;
      indexing += 1;
    }
  }

  return newGrid;
}

function generateInitialBox(arr, entries) {
  var entryCopy = entries.slice();
  var i = 0;
  var cellsToFill = 9;
  while (i < cellsToFill) {
    var toAdd = entryCopy[randomlyGeneratedValue(0, entryCopy.length)];
    arr[i] = toAdd;
    entryCopy.splice(entryCopy.indexOf(toAdd), 1);
    i++;
  }
}

const removingEntries = (newGrid, difficulty) => {
  let minToRemove;
  let maxToRemove;
  if (difficulty === 'Beginner') {
    minToRemove = 1;
    maxToRemove = 1;
  } else if (difficulty === 'Easy') {
    minToRemove = 3;
    maxToRemove = 3;
  } else if (difficulty === 'Normal') {
    minToRemove = 5;
    maxToRemove = 6;
  } else if (difficulty === 'Hard') {
    minToRemove = 7;
    maxToRemove = 10;
  }

  for (let row = 0; row < newGrid.length; row += 1) {
    let entriesToRemove = randomlyGeneratedValue(minToRemove, maxToRemove);
    let entriesRemoved = 0;
    let indexEntries = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    while (entriesRemoved < entriesToRemove) {
      let entryRemoved = randomlyGeneratedValue(0, indexEntries.length);
      newGrid[row].splice(indexEntries[entryRemoved], 1, null);
      indexEntries.splice(entryRemoved, 1);
      entriesRemoved += 1;
    }
  }
};

function selectRow(boxNumber) {
  switch (boxNumber) {
    case 1:
    case 2:
    case 3:
      return 0;
    case 4:
    case 5:
    case 6:
      return 3;
    case 7:
    case 8:
    case 9:
      return 6;
    default:
      break;
  }
}

function selectCol(boxNumber) {
  switch (boxNumber) {
    case 1:
    case 4:
    case 7:
      return 0;
    case 2:
    case 5:
    case 8:
      return 3;
    case 3:
    case 6:
    case 9:
      return 6;
    default:
      break;
  }
}

const createGrid = () => {
  let arr = [];

  for (let i = 0; i < 9; i++) {
    let innerArr = [];
    for (let j = 0; j < 9; j++) {
      innerArr.push(null);
    }
    arr.push(innerArr);
  }

  return arr;
};

const verifyRow = (grid, row, val) => {
  //console.log(`${grid[row]} ${row} ${val}`);
  if (Array.from(grid[row], x => Number(x)).includes(Number(val))) {
    return false;
  }
  return true;
};

const verifyCol = (grid, col, val) => {
  for (let row = 0; row < 9; row++) {
    if (Number(grid[row][col]) === Number(val)) {
      return false;
    }
  }
  return true;
};

const verifyBox = (grid, row, col, val) => {
  let startRow = parseInt(row / 3) * 3;
  let startCol = parseInt(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (Number(grid[r][c]) === Number(val)) {
        return false;
      }
    }
  }
  return true;
};

const isValid = (grid, row, col, num) => {
  if (
    verifyBox(grid, row, col, num) &&
    verifyCol(grid, col, num) &&
    verifyRow(grid, row, num)
  ) {
    return true;
  }
  return false;
};

const verifyFilled = grid => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return false;
      }
    }
  }
  return true;
};

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array fisher yates
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const solve = (grid, shuffled) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        shuffled.forEach(choice => {
          if (isValid(grid, row, col, choice)) {
            grid[row][col] = choice;
            solve(grid, shuffled);
            // this is something that I added to stop the recursion when a solution is found otherwise it finds every solution!
            if (!verifyFilled(grid)) {
              grid[row][col] = null;
            }
          }
        });
        return;
      }
    }
  }
  return grid;
};

export default {
  randomlyGeneratedValue,
  insertIntoCol,
  insertIntoRow,
  insertIntoBox,
  insertConstraint,
  checkColElementsExist,
  updateBoxGrid,
  intersectArrays,
  scanGrid,
  arrayLengths,
  generateValidEntries,
  verifyRow,
  verifyCol,
  verifyBox,
  ensureGridSatisfied,
  generateBox,
  generateInitialBox,
  removingEntries,
  ensureGridFilled,
  selectRow,
  selectCol,
  createGrid,
  isValid,
  verifyFilled,
  shuffle,
  solve,
};
