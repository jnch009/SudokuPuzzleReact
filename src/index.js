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

  class Row extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          entries: []
        };
      }

      render(){
        return this.state.entries;
      }
  }

  class Col extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          entries: []
        };
      }

      render(){
        return this.state.entries;
      }
  }
  
  class Board extends React.Component {
    /*generateInitialState(){
        var sqr = document.getElementsByClassName("sudoku-row");
        console.log(sqr);
    }*/
    
    randomlyGeneratedValue(min,max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    renderGrid() {
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

        var renderGrid = order.map(function(val){
            if (val !== 0){
                return <Square number={val}/>;
            } else {
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
                    {this.renderGrid()}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid()}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid()}
                </div>
            </div>
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderGrid()}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid()}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid()}
                </div>
            </div>
            <div className="sudoku-row">
                <div className="sudoku-grid">
                    {this.renderGrid()}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid()}
                </div>
                <div className="sudoku-grid">
                    {this.renderGrid()}
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
  