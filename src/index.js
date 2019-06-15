import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 function Square(props) {
    /*constructor(props){

    }*/

      return (
        <button className="square">
          {props.number}
        </button>
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
      //temporary
      var startRow = 8;
      var startCol = 0;
      var currentRow = startRow;
      var currentCol = startCol;

      // number of elements to set 
      var numElements = this.randomlyGeneratedValue(1,20);
      var arr = Array(9).fill(null).map(x=>Array(9).fill(null));
      var entries = [1,2,3,4,5,6,7,8,9];

      // generating the unique values
      
      var targetGrid = 0;
      var i = 0;

      while (targetGrid < 9) {
        var entryCopy = entries.slice();
        i = 0;
        while (i < 9){
          var toAdd = this.randomlyGeneratedArrayValue(0,entryCopy.length,entryCopy);
          arr[targetGrid].splice(i,1,toAdd);
          entryCopy.splice(entryCopy.indexOf(toAdd),1);
          i++;
        }
        targetGrid+=1;
      }
    
      var order = Array(9).fill(null).map(x=>Array(9).fill(null));
        i = 0;
        while (i < numElements){
            var positionAddRow = this.randomlyGeneratedValue(0,9);
            var positionAddCol = this.randomlyGeneratedValue(0,9);
            if (order[positionAddRow][positionAddCol] === null){
                order[positionAddRow].splice(positionAddCol,1,arr[i]);
            }
            i++;
        }

        var currentGrid = this.state.grid.slice();
        var renderGrid = order.map(function(val,i){
            if (val !== 0){
                currentGrid[currentRow][currentCol] = val;
                
                if (i === 2 || i === 5){
                  currentCol = startCol;
                  currentRow -= 1;
                } else {
                  currentCol += 1;
                }
                
                return <Square number={val}/>;
            } else if (i === 2 || i === 5){
                currentCol = startCol;
                currentRow -= 1;
                return <Square number={null}/>;
            } 
            else {
                currentCol += 1;
                return <Square number={null}/>;
            }
        })
        this.setState(() => ({grid: currentGrid}));
        return renderGrid;
    }

    randomlyGeneratedArrayValue(min,max,arr){
      return arr[Math.floor(Math.random() * (max - min)) + min];
    }
    
    randomlyGeneratedValue(min,max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    checkConditions(){

    }

    renderSquare(i,j){
      return (
        <Square
          number = {this.state.grid[i][j]}
        />
      );
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
  