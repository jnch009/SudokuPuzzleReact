import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 class Square extends React.Component {
    /*constructor(props){

    }*/

    render() {
      return (
        <button className="square">
          {this.props.number}
        </button>
      );
    }
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

    }
    
    randomlyGeneratedValue(min,max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    checkConditions(){

    }

    renderGrid(startRow,startCol) {
        var currentRow = startRow;
        var currentCol = startCol;

        // number of elements to set 
        var numElements = this.randomlyGeneratedValue(1,10);
        var arr = [];

        // generating the unique values
        var i = 0;
        while (i < numElements){
            var toAdd = this.randomlyGeneratedValue(1,10);
            if (arr.indexOf(toAdd) === -1) {
                arr.push(toAdd);
                i++;
            }
        }

        var order = Array(9).fill(0);
        i = 0;
        while (i < numElements){
            var positionAdd = this.randomlyGeneratedValue(0,9);
            if (order[positionAdd] === 0){
                order.splice(positionAdd,1,arr[i]);
            }
            i++;
        }

        var currentGrid = this;
        var renderGrid = order.map(function(val,i){
            if (val !== 0){
                const newGrid = currentGrid.state.grid.slice();
                newGrid[currentRow][currentCol] = val;
                
                if (i === 2 || i === 5 || i === 7){
                  currentCol = startCol;
                  currentRow -= 1;
                } else {
                  currentCol += 1;
                }
                
                return <Square number={val}/>;
            } else if (i === 2 || i === 5 || i === 7){
                currentCol = startCol;
                currentRow -= 1;
                return <Square number={null}/>;
            } 
            else {
                currentCol += 1;
                return <Square number={null}/>;
            }
        })
        //this.setState({grid: currentGrid});
        return renderGrid;
    }

    renderSquare(i,j){
      return (
        <Square
          number = {this.state.grid[i][j]}
        />
      )
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
  