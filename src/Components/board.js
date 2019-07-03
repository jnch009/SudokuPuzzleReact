import React from 'react';
import {Square} from './square';
import fn from '../helperFn/boardFunctions';
import {Alert} from "shards-react";

class Board extends React.Component {
    constructor(props){
      super(props);

      this.interval = null;
      this.state = {
        // https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
        grid: Array(9).fill(null).map(x=>Array(9).fill(null)),
        displayError: false,
        beginTimer: 0,
        timeUntilDismissed: 3
      };

      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.showInvalidKeyPress = this.showInvalidKeyPress.bind(this);
      this.handleTimeChange = this.handleTimeChange.bind(this);
      this.clearInterval = this.clearInterval.bind(this);
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

    showInvalidKeyPress(){
      this.clearInterval();
      this.setState({displayError: true, beginTimer: 0, timeUntilDismissed: 3});
      this.interval = setInterval(this.handleTimeChange, 1000);
    }

    handleTimeChange() {
      if (this.state.beginTimer < this.state.timeUntilDismissed - 1) {
        this.setState({
          ...this.state,
          ...{ beginTimer: this.state.beginTimer + 1 }
        });
        return;
      }
  
      this.setState({ ...this.state, ...{ displayError: false } });
      this.clearInterval();
    }
  
    clearInterval() {
      clearInterval(this.interval);
      this.interval = null;
    }

    handleKeyPress(key,row,col) {
      if (key === null) {
        const gridCopy = this.state.grid.slice();
        gridCopy[row].splice(col,1,key);
        this.setState(() => ({grid: gridCopy}));
        return;
      }

      var digits = [1,2,3,4,5,6,7,8,9];
      if (digits.indexOf(parseInt(key)) === -1){
        this.showInvalidKeyPress();
        //this.setState(() => ({displayError: true}));
      } else {
        const gridCopy = this.state.grid.slice();
        gridCopy[row].splice(col,1,key);
        this.setState(() => ({grid: gridCopy}));
      }
    }

    renderSquare(i,j,box){
      const gridEntry = this.state.grid[i][j];
      
      if (gridEntry === null || typeof(gridEntry) === "string") {
        return (
          <Square number={this.state.grid[i][j]} 
                  pressKey={this.handleKeyPress} 
                  row={i} col={j} grid={this.state.grid} boxNumber={box}
                  modify={true}/>
        );
      } else {
        return (
          <Square number = {this.state.grid[i][j]} modify = {false}/>
        );
      }
    }
    
    render() {
      const finish = fn.ensureGridSatisfied(this.state.grid) && fn.ensureGridFilled(this.state.grid);
      let winner;
      let error;
      if (finish){
        winner = "You have successfully solved the sudoku!";
      } else {
        winner = "You are not done yet!";
      }

      if (this.state.displayError){
        error = <div className="alert">
        <Alert theme="danger" open={this.state.displayError}>Must type a number between 1 and 9</Alert>
      </div>;
      }

      return (
          <div className="sudoku">
            {error}
            <div className="winCondition">{winner}</div>
            <div className="sudoku-row">
                  <div className="sudoku-grid">
                      {this.renderSquare(8,0,7)}
                      {this.renderSquare(8,1,7)}
                      {this.renderSquare(8,2,7)}
                      {this.renderSquare(7,0,7)}
                      {this.renderSquare(7,1,7)}
                      {this.renderSquare(7,2,7)}
                      {this.renderSquare(6,0,7)}
                      {this.renderSquare(6,1,7)}
                      {this.renderSquare(6,2,7)}
                  </div>
                  <div className="sudoku-grid">
                      {this.renderSquare(8,3,8)}
                      {this.renderSquare(8,4,8)}
                      {this.renderSquare(8,5,8)}
                      {this.renderSquare(7,3,8)}
                      {this.renderSquare(7,4,8)}
                      {this.renderSquare(7,5,8)}
                      {this.renderSquare(6,3,8)}
                      {this.renderSquare(6,4,8)}
                      {this.renderSquare(6,5,8)}
                  </div>
                  <div className="sudoku-grid">
                      {this.renderSquare(8,6,9)}
                      {this.renderSquare(8,7,9)}
                      {this.renderSquare(8,8,9)}
                      {this.renderSquare(7,6,9)}
                      {this.renderSquare(7,7,9)}
                      {this.renderSquare(7,8,9)}
                      {this.renderSquare(6,6,9)}
                      {this.renderSquare(6,7,9)}
                      {this.renderSquare(6,8,9)}
                  </div>
              </div>
              <div className="sudoku-row">
                  <div className="sudoku-grid">
                      {this.renderSquare(5,0,4)}
                      {this.renderSquare(5,1,4)}
                      {this.renderSquare(5,2,4)}
                      {this.renderSquare(4,0,4)}
                      {this.renderSquare(4,1,4)}
                      {this.renderSquare(4,2,4)}
                      {this.renderSquare(3,0,4)}
                      {this.renderSquare(3,1,4)}
                      {this.renderSquare(3,2,4)}
                  </div>
                  <div className="sudoku-grid">
                      {this.renderSquare(5,3,5)}
                      {this.renderSquare(5,4,5)}
                      {this.renderSquare(5,5,5)}
                      {this.renderSquare(4,3,5)}
                      {this.renderSquare(4,4,5)}
                      {this.renderSquare(4,5,5)}
                      {this.renderSquare(3,3,5)}
                      {this.renderSquare(3,4,5)}
                      {this.renderSquare(3,5,5)}
                  </div>
                  <div className="sudoku-grid">
                      {this.renderSquare(5,6,6)}
                      {this.renderSquare(5,7,6)}
                      {this.renderSquare(5,8,6)}
                      {this.renderSquare(4,6,6)}
                      {this.renderSquare(4,7,6)}
                      {this.renderSquare(4,8,6)}
                      {this.renderSquare(3,6,6)}
                      {this.renderSquare(3,7,6)}
                      {this.renderSquare(3,8,6)}
                  </div>
              </div>
              <div className="sudoku-row">
                  <div className="sudoku-grid">
                      {this.renderSquare(2,0,1)}
                      {this.renderSquare(2,1,1)}
                      {this.renderSquare(2,2,1)}
                      {this.renderSquare(1,0,1)}
                      {this.renderSquare(1,1,1)}
                      {this.renderSquare(1,2,1)}
                      {this.renderSquare(0,0,1)}
                      {this.renderSquare(0,1,1)}
                      {this.renderSquare(0,2,1)}
                  </div>
                  <div className="sudoku-grid">
                      {this.renderSquare(2,3,2)}
                      {this.renderSquare(2,4,2)}
                      {this.renderSquare(2,5,2)}
                      {this.renderSquare(1,3,2)}
                      {this.renderSquare(1,4,2)}
                      {this.renderSquare(1,5,2)}
                      {this.renderSquare(0,3,2)}
                      {this.renderSquare(0,4,2)}
                      {this.renderSquare(0,5,2)}
                  </div>
                  <div className="sudoku-grid">
                      {this.renderSquare(2,6,3)}
                      {this.renderSquare(2,7,3)}
                      {this.renderSquare(2,8,3)}
                      {this.renderSquare(1,6,3)}
                      {this.renderSquare(1,7,3)}
                      {this.renderSquare(1,8,3)}
                      {this.renderSquare(0,6,3)}
                      {this.renderSquare(0,7,3)}
                      {this.renderSquare(0,8,3)}
                  </div>
              </div>
          </div>
        );
      }
    }

export default Board;
