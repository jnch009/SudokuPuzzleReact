import React from 'react';
import {Square, ActiveSquare} from './square';
import fn from '../helperFn/boardFunctions';

class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        // https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
        grid: Array(9).fill(null).map(x=>Array(9).fill(null)),
      };

      this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
      var arr = Array(9).fill(null);
      var entries = [1,2,3,4,5,6,7,8,9];
      fn.generateInitialBox(arr,entries);

      var newGrid = Array(9).fill(null).map(x=>Array(9).fill(null));
      var boxGrid = Array(9).fill(null).map(x=>[]);
      var row = 0;
      var col = 0;

      while (row <= 6){
        while (col <= 6){
          if (row === 0 && col === 0){
            fn.generateBox(row,col,arr,newGrid);
          } else {
            arr = fn.generateValidEntries(boxGrid,entries,row,col,newGrid);
            fn.generateBox(row,col,arr,newGrid);
          }

          if (row === 6 && col === 6){
            if (!fn.ensureGridSatisfied(newGrid)) {
              row = 0;
              col = 0;
              fn.generateInitialBox(arr,entries);
              newGrid = Array(9).fill(null).map(x=>Array(9).fill(null));
              continue;
            }
          }

          boxGrid = Array(9).fill(null).map(x=>[]);
          col += 3;
        }

        row += 3;
        col = 0;
      }

      fn.removingEntries(newGrid);
      this.setState(() => ({grid: newGrid}));
    }

    handleKeyPress(key,row,col) {
      const gridCopy = this.state.grid.slice();
      gridCopy[row][col] = key;
      this.setState(() => ({grid: gridCopy}));
    }

    renderSquare(i,j){
        if (this.state.grid[i][j] !== null){
          return (
            <Square number = {this.state.grid[i][j]}/>
          );
        } else {
          return (
            <ActiveSquare number={this.state.grid[i][j]} 
                          pressKey={this.handleKeyPress}
                          row={i}
                          col={j}/>
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

export default Board;
