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

        var renderGrid = order.map(function(val,i){
            if (val !== 0){

                const grid = this.state.grid.slice(0);
                grid[currentRow][currentCol] = val;
                this.setState({ grid: grid });
                return <Square number={val}/>;

            } else if (i % 2 === 0 || i % 5 === 0 || i % 7 === 0){
                currentCol = startCol;
                currentRow -= 1;
                return <Square number={null}/>;
            } 
            else {
                currentCol += 1;
                return <Square number={null}/>;
            }
        })

        return renderGrid;
    }
  
    render() {
      return (
        <div className="sudoku">
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderGrid(8,0)}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid(8,3)}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid(8,6)}
                </div>
            </div>
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderGrid(5,0)}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid(5,3)}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid(5,6)}
                </div>
            </div>
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderGrid(2,0)}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid(2,3)}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid(2,6)}
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
  