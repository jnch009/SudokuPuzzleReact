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
      for (var row = 0; row < 1; row += 1){
        for (var col = 0; col <= 6; col += 3){
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
          /*
          if (this.checkConditions(arrEntries[indexing],row,col,newGrid)){
            newGrid[row].splice(col,1,arrEntries[indexing]);
          } else {
            var entryToAdd = arrEntries[indexing];
            var indexOfEntry = arrEntries[indexing].indexOf(entryToAdd);
            arrEntries.splice(indexOfEntry,1);
            arrEntries.push(entryToAdd);
            continue;
          }*/

          col+=1;
          indexing += 1;
        }
      }

      return newGrid;
    }

    // intersecting two sets
    //concat = concat.filter((item, index) => concat.indexOf(item) !== index);
    intersectArrays(arr1,arr2){
      var concat = arr1.concat(arr2);
      concat = concat.filter((item, index) => concat.indexOf(item) !== index);
      return concat;
    }

    generateValidEntries(boxGrid, entries, beginRow, beginCol, newGrid){
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

      // Want to refactor this, looks ugly
      var concatResult;
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
      return concatResult;
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
  