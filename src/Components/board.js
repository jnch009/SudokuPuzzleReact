import React from 'react';
import { Alert } from 'shards-react';

import fn from '../helperFn/boardFunctions';
import { Square } from './square';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = {
      // https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
      grid: [],
      displayError: false,
      beginTimer: 0,
      timeUntilDismissed: 3,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.showInvalidKeyPress = this.showInvalidKeyPress.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    let gridNewly = fn.createGrid();
    fn.solve(gridNewly, fn.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    
    this.setState(
      {
        grid: gridNewly,
      },
      () => {
        console.log(this.state.grid);
      },
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.difficulty !== this.props.difficulty ||
      this.props.newGame === true
    ) {
      this.componentDidMount();
    }
  }

  showInvalidKeyPress() {
    this.clearInterval();
    this.setState({ displayError: true, beginTimer: 0, timeUntilDismissed: 3 });
    this.interval = setInterval(this.handleTimeChange, 1000);
  }

  handleTimeChange() {
    if (this.state.beginTimer < this.state.timeUntilDismissed - 1) {
      this.setState({
        ...this.state,
        ...{ beginTimer: this.state.beginTimer + 1 },
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

  handleKeyPress(key, row, col) {
    if (key === null) {
      const gridCopy = this.state.grid.slice();
      gridCopy[row].splice(col, 1, key);
      this.setState(() => ({ grid: gridCopy }));
      return;
    }

    var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (digits.indexOf(parseInt(key)) === -1) {
      this.showInvalidKeyPress();
      //this.setState(() => ({displayError: true}));
    } else {
      const gridCopy = this.state.grid.slice();
      gridCopy[row].splice(col, 1, key);
      this.setState(() => ({ grid: gridCopy }));
    }
  }

  renderSquare(i, j, box) {
    const gridEntry = this.state.grid[i][j];

    if (gridEntry === null || typeof gridEntry === 'string') {
      return (
        <Square
          key={`${i} ${j} ${box}`}
          number={this.state.grid[i][j]}
          pressKey={this.handleKeyPress}
          row={i}
          col={j}
          grid={this.state.grid}
          boxNumber={box}
          modify={true}
        />
      );
    } else {
      return (
        <Square
          key={`${i} ${j} ${box}`}
          number={this.state.grid[i][j]}
          modify={false}
        />
      );
    }
  }

  render() {
    // const finish =
    //   fn.ensureGridSatisfied(this.state.grid) &&
    //   fn.ensureGridFilled(this.state.grid);
    // let winner;
    // let error;
    // if (finish) {
    //   winner = 'You have successfully solved the sudoku!';
    // } else {
    //   winner = 'You are not done yet!';
    // }

    // if (this.state.displayError) {
    //   error = (
    //     <div className='alertConstraint'>
    //       <Alert theme='danger' open={this.state.displayError}>
    //         Must type a number between 1 and 9
    //       </Alert>
    //     </div>
    //   );
    // }

    // const generateGrid = (startRow, startCol, boxNumber) => {
    //   let grid = [];
    //   for (let row = startRow; row > startRow - 3; row--) {
    //     for (let col = startCol; col < startCol + 3; col++) {
    //       grid.push(this.renderSquare(row, col, boxNumber));
    //     }
    //   }
    //   return grid;
    // };

    return (
      <div className='sudoku'>
        {/* {error}
        <div className='winCondition'>{winner}</div>
        <div className='sudoku-row'>
          <div className='sudoku-grid'>{generateGrid(8, 0, 7)}</div>
          <div className='sudoku-grid'>{generateGrid(8, 3, 8)}</div>
          <div className='sudoku-grid'>{generateGrid(8, 6, 9)}</div>
        </div>
        <div className='sudoku-row'>
          <div className='sudoku-grid'>{generateGrid(5, 0, 4)}</div>
          <div className='sudoku-grid'>{generateGrid(5, 3, 5)}</div>
          <div className='sudoku-grid'>{generateGrid(5, 6, 6)}</div>
        </div>
        <div className='sudoku-row'>
          <div className='sudoku-grid'>{generateGrid(2, 0, 1)}</div>
          <div className='sudoku-grid'>{generateGrid(2, 3, 2)}</div>
          <div className='sudoku-grid'>{generateGrid(2, 6, 3)}</div>
        </div> */}
      </div>
    );
  }
}

export default Board;
