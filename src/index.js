import React from 'react';
import ReactDOM from 'react-dom';
//import Button from 'react-bootstrap/Button';
import { Button } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import './index.css';

 function Square(props) {
    /*constructor(props){

    }*/

      return (
        <Button disabled theme="dark" active="true" className="square">
          {props.number}
        </Button>
      );
  }

  function ActiveSquare(props) {
    return (
      <Button theme="dark" active="true" className="square">
        {props.number}
      </Button>
    );
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        // https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
        grid: Array(9).fill(null).map(x=>Array(9).fill(null)),
      };
    }

    componentDidMount(){
      //var arr = Array(9).fill(null).map(x=>Array(9).fill(null));
      var arr = Array(9).fill(null);
      var entries = [1,2,3,4,5,6,7,8,9];
      
      var targetGrid = 0;
      var i = 0;

      //while (targetGrid < 9) {
        var entryCopy = entries.slice();
        i = 0;
        //var cellsToFill = this.randomlyGeneratedValue(1,10);
        var cellsToFill = 9;
        while (i < cellsToFill){
          var toAdd = this.randomlyGeneratedArrayValue(0,entryCopy.length,entryCopy);
          arr[i] = toAdd;
          entryCopy.splice(entryCopy.indexOf(toAdd),1);
          i++;
        }
        //targetGrid+=1;
      //}

      var newGrid = Array(9).fill(null).map(x=>Array(9).fill(null));
      var boxGrid = Array(9).fill(null).map(x=>[]);

      //this.generateValidEntries(boxGrid,entries,0,0,newGrid);

      //var indexArr = 0;
      for (var row = 0; row <= 3; row += 3){
        for (var col = 0; col <= 3; col += 3){
          if (row === 0 && col === 0){
            this.generateBox(row,col,arr,newGrid);
          } else {
            arr = this.generateValidEntries(boxGrid,entries,row,col,newGrid);
            this.generateBox(row,col,arr,newGrid);
          }
          boxGrid = Array(9).fill(null).map(x=>[]);
        }
      }

      this.setState(() => ({grid: newGrid}));
    }

    generateBox(beginRow,beginCol,arrEntries, newGrid){
      var arrToAdd = Array(9).fill(null);
      var indexing = 0;
      for (var row = beginRow; row < beginRow+3; row++){
        
        var col = beginCol;
        while (col < beginCol+3){
          newGrid[row].splice(col,1,arrEntries[indexing]);
          col+=1;
          indexing += 1;
        }
      }

      return newGrid;
    }    

    generateValidEntries(boxGrid, entries, beginRow, beginCol, newGrid){
      var columnInsert = false;
      var bothColumnRowInsert = false;

      if (newGrid[beginRow].every(function(x){
        return x === null;
      })) {
        columnInsert = true;
      } else if (this.checkColElementsExist(newGrid,beginCol)){
        bothColumnRowInsert = true;
      }

      var entryIndex;
      var boxIndex = 0;
      for (var row = beginRow; row < beginRow+3; row++){
        for (var col = beginCol; col < beginCol+3; col++){
          entryIndex = 0;
          while (entryIndex < 9) {
            if (this.checkConditions(entries[entryIndex],row,col,newGrid)){
                boxGrid[boxIndex].push(entries[entryIndex]);
            }
            entryIndex+=1;
          }
          boxIndex += 1;
        }
      }

      // 3 scenarios:
      // 1) restricted by row, DONE
      // 2) restricted by column, DONE
      // 3) restricted by both

      var concatResult = [];
      if (bothColumnRowInsert){
        var iterations = 0;
        var row1 = [];
        var row2 = [];
        var row3 = [];
        var fillRow2 = false;
        
        //TODO: if intersection returns an empty array, need a new strategy to solve
        //Solving with intersection will not work in this case
        //NEW STRATEGY:
        //for the case where intersecting gives an empty array:
        //this means there is at least 3 boxes with 3 of the same values ie. (6,7,8)
        //find three boxes that share this triplet and insert values any way you want
        //adjust the boxGrid accordingly
        //scan for any boxes that have only 2 values which means you can choose either one
        //or scan for singletons in which you can just add the value remaining
        //adjust the boxGrid again
        //continue scanning for singletons or boxes with 2 choices until filled
        //if done correctly I believe this should solve it

        while (iterations < 2) {

          var rowIntersected = [];
          this.intersectRowEntries(0,boxGrid,rowIntersected);

          if (rowIntersected.some(this.emptyArrays)) {
            var tempGrid = Array(boxGrid.length).fill(null);
            var tripletArr = this.identifyingTriplets(boxGrid,tempGrid);
            var tripletIndex = 0;
            tempGrid.forEach((v,i) => {
              if (v !== null){
                tempGrid[i] = tripletArr[tripletIndex];
                tripletIndex += 1;
              }
            })
          }

          var rowResult = Array(3).fill(null);
          var sortedIntersect = rowIntersected.slice(0).sort(this.sortAscending);
          var indexOfIntersect;
          var insertValue;
          var valueToChoose;

          // technically if you fill in a box, you should clear it out
          for (var intersect = 0; intersect < rowIntersected.length; intersect++){
            indexOfIntersect = rowIntersected.indexOf(sortedIntersect[intersect]);
            if (sortedIntersect[intersect].length == 1) {
              insertValue = sortedIntersect[intersect][0];
            }  
            else if (sortedIntersect[intersect].length == 2) {
              valueToChoose = this.randomlyGeneratedValue(0,1);
              insertValue = sortedIntersect[intersect][valueToChoose];
            }
            this.updatingRowResultAndGrid(indexOfIntersect,rowIntersected, boxGrid, insertValue, rowResult);
            sortedIntersect = rowIntersected.slice(0).sort(this.sortAscending);
          }

          boxGrid = boxGrid.slice(3);

          if (!fillRow2){
            rowResult.forEach(function(x){
              row1.push(x);
            });
          } else {
            rowResult.forEach(function(x){
              row2.push(x);
            });
            fillRow2 = false;
          }

          iterations += 1;
        }

        concatResult.push(row1.concat(row2));
        concatResult = concatResult.flat();
        
        // do 2 checks
        // if singleton (1 element) then assign to that box and update accordingly
        // if two elements then randomly choose a number between 0 and 1 and update accordingly
      }
      // Want to refactor this, looks ugly
      // boxGrid[0],boxGrid[3],boxGrid[6] is for row boxes
      // boxGrid[0],boxGrid[1],boxGrid[2] is for col boxes
      else if (!columnInsert) {
        // this check is for the last box in the row
        if (this.intersectArrays(boxGrid[0],boxGrid[3]).length !== 0){
          var row1Entries = this.intersectArrays(boxGrid[0],boxGrid[3]);
          var row2Entries = this.intersectArrays(boxGrid[3],boxGrid[6]);
          var concatRows = row1Entries.concat(row2Entries);
          var row3Entries = entries.filter(x=>!concatRows.includes(x));
          concatResult = row1Entries.concat(row2Entries);
          concatResult = concatResult.concat(row3Entries);
        } else {
          concatResult = boxGrid[0].concat(boxGrid[3]).concat(boxGrid[6]);
        }
      } else {
        var row1Entries = this.intersectArrays(boxGrid[0],boxGrid[1]);
        var row2Entries = this.intersectArrays(boxGrid[1],boxGrid[2]);
        var concatRows = row1Entries.concat(row2Entries);
        var row3Entries = entries.filter(x=>!concatRows.includes(x));
        for (var i = 0; i < 3; i++){
          concatResult.push(row1Entries[i]);
          concatResult.push(row2Entries[i]);
          concatResult.push(row3Entries[i]);
        }
      }
      
      return concatResult;
    }

    identifyingTriplets(boxGrid, tempGrid){
      var tripleToMatch = [];
      for (var box = 0; box < 8; box += 1){
        for (var innerBox = box+1; innerBox < 9; innerBox+=1) {
          var intersect = this.intersectArrays(boxGrid[box],boxGrid[innerBox]);
          if (intersect.length == 3){
            if (tempGrid.indexOf(boxGrid[box]) === -1 && tempGrid.indexOf(boxGrid[innerBox]) === -1){
                tempGrid.splice(box,1,boxGrid[box]);
                tempGrid.splice(innerBox,1,boxGrid[innerBox]);
                
                if (tripleToMatch === []){
                  tripleToMatch = intersect;
                }

            } else if (tempGrid.indexOf(boxGrid[box]) === -1) {
                tempGrid.splice(box,1,boxGrid[box]);
            } else if (tempGrid.indexOf(boxGrid[innerBox]) === -1) {
                tempGrid.splice(box,1,boxGrid[innerBox]);
            }
          }

          if (tempGrid.filter(x=>x!==null).length === 3){
              return tripleToMatch;
          }
        }
      }
    }

    // intersecting two sets
    //concat = concat.filter((item, index) => concat.indexOf(item) !== index);
    intersectArrays(arr1,arr2){
      var concat = arr1.concat(arr2);
      concat = concat.filter((item, index) => concat.indexOf(item) !== index);
      return concat;
    }

    updateBoxGrid(boxGrid, valuetoInsert) {
      for (var i = 0; i < boxGrid.length; i++){
        let box = boxGrid[i];
        if (box.indexOf(valuetoInsert) !== -1){
          box.splice(box.indexOf(valuetoInsert),1);
        }
        boxGrid[i] = box;
      }
    }

    checkColElementsExist(grid,col){
      for (var row = 0; row < 9; row += 1) {
        if (grid[row][col] !== null) {
          return true;
        }
      }
      return false;
    }

    emptyArrays(x){
      return x.length === 0;
    }

    sortAscending(a,b){
      return a.length - b.length; 
    }

    intersectRowEntries(startIndex, boxGrid, rowIntersected) {
      for (var index = startIndex; index < startIndex+3; index += 1){
        var row1Entries = this.intersectArrays(boxGrid[index],boxGrid[index+3]);
        rowIntersected.push(row1Entries);
      }
    }

    updatingRowResultAndGrid(indexOfIntersect,rowIntersected,boxGrid,toInsert,rowResult){
      rowResult.splice(indexOfIntersect, 1, toInsert);
      rowIntersected[indexOfIntersect] = [];
      this.updateBoxGrid(rowIntersected, toInsert);
      this.updateBoxGrid(boxGrid, toInsert);
    }

    randomlyGeneratedArrayValue(min,max,arr){
      return arr[Math.floor(Math.random() * (max - min)) + min];
    }
    
    randomlyGeneratedValue(min,max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    checkConditions(valueToAdd,rowNumber,colNumber,grid){
      if (!this.checkRow(grid,rowNumber,valueToAdd) || !this.checkCol(grid,colNumber,valueToAdd)){
        return false;
      }
      return true;
    }
    
    checkRow(grid, rowNumber, valueToAdd){
      if (grid[rowNumber].indexOf(valueToAdd) !== -1) {
        return false;
      }
      return true;
    }

    checkCol(grid, colNumber, valueToAdd){
      for (var row = 0; row < 9; row += 1) {
        if (grid[row][colNumber] === valueToAdd) {
          return false;
        }
      }

      return true;
    }

    renderSquare(i,j){
      if (this.state.grid[i][j] !== null){
        return (
          <Square
            number = {this.state.grid[i][j]}
          />
        );
      } else {
        return (
          <ActiveSquare
            number = {this.state.grid[i][j]}
          />
        )
      }
    }
  
    render() {
      return (
        <div className="sudoku">
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderSquare(8,0)}
                    {this.renderSquare(8,1)}
                    {this.renderSquare(8,2)}
                    {this.renderSquare(7,0)}
                    {this.renderSquare(7,1)}
                    {this.renderSquare(7,2)}
                    {this.renderSquare(6,0)}
                    {this.renderSquare(6,1)}
                    {this.renderSquare(6,2)}
                </div>
                <div className="sudoku-grid">
                    {this.renderSquare(8,3)}
                    {this.renderSquare(8,4)}
                    {this.renderSquare(8,5)}
                    {this.renderSquare(7,3)}
                    {this.renderSquare(7,4)}
                    {this.renderSquare(7,5)}
                    {this.renderSquare(6,3)}
                    {this.renderSquare(6,4)}
                    {this.renderSquare(6,5)}
                </div>
                <div className="sudoku-grid">
                    {this.renderSquare(8,6)}
                    {this.renderSquare(8,7)}
                    {this.renderSquare(8,8)}
                    {this.renderSquare(7,6)}
                    {this.renderSquare(7,7)}
                    {this.renderSquare(7,8)}
                    {this.renderSquare(6,6)}
                    {this.renderSquare(6,7)}
                    {this.renderSquare(6,8)}
                </div>
            </div>
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderSquare(5,0)}
                    {this.renderSquare(5,1)}
                    {this.renderSquare(5,2)}
                    {this.renderSquare(4,0)}
                    {this.renderSquare(4,1)}
                    {this.renderSquare(4,2)}
                    {this.renderSquare(3,0)}
                    {this.renderSquare(3,1)}
                    {this.renderSquare(3,2)}
                </div>
                <div className="sudoku-grid">
                    {this.renderSquare(5,3)}
                    {this.renderSquare(5,4)}
                    {this.renderSquare(5,5)}
                    {this.renderSquare(4,3)}
                    {this.renderSquare(4,4)}
                    {this.renderSquare(4,5)}
                    {this.renderSquare(3,3)}
                    {this.renderSquare(3,4)}
                    {this.renderSquare(3,5)}
                </div>
                <div className="sudoku-grid">
                    {this.renderSquare(5,6)}
                    {this.renderSquare(5,7)}
                    {this.renderSquare(5,8)}
                    {this.renderSquare(4,6)}
                    {this.renderSquare(4,7)}
                    {this.renderSquare(4,8)}
                    {this.renderSquare(3,6)}
                    {this.renderSquare(3,7)}
                    {this.renderSquare(3,8)}
                </div>
            </div>
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderSquare(2,0)}
                    {this.renderSquare(2,1)}
                    {this.renderSquare(2,2)}
                    {this.renderSquare(1,0)}
                    {this.renderSquare(1,1)}
                    {this.renderSquare(1,2)}
                    {this.renderSquare(0,0)}
                    {this.renderSquare(0,1)}
                    {this.renderSquare(0,2)}
                </div>
                <div className="sudoku-grid">
                    {this.renderSquare(2,3)}
                    {this.renderSquare(2,4)}
                    {this.renderSquare(2,5)}
                    {this.renderSquare(1,3)}
                    {this.renderSquare(1,4)}
                    {this.renderSquare(1,5)}
                    {this.renderSquare(0,3)}
                    {this.renderSquare(0,4)}
                    {this.renderSquare(0,5)}
                </div>
                <div className="sudoku-grid">
                    {this.renderSquare(2,6)}
                    {this.renderSquare(2,7)}
                    {this.renderSquare(2,8)}
                    {this.renderSquare(1,6)}
                    {this.renderSquare(1,7)}
                    {this.renderSquare(1,8)}
                    {this.renderSquare(0,6)}
                    {this.renderSquare(0,7)}
                    {this.renderSquare(0,8)}
                </div>
            </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  