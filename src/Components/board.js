import React from 'react';
import { Alert } from 'shards-react';

import fn from '../helperFn/boardFunctions';
import Row from './row';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';

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
      complete: false,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.showInvalidKeyPress = this.showInvalidKeyPress.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  generateBoard = () => {
    let gridNewly = fn.createGrid();
    fn.solve(gridNewly, fn.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    fn.removingEntries(gridNewly, this.props.difficulty);

    this.setState({
      grid: gridNewly,
    });
  };

  componentDidMount() {
    this.generateBoard();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.difficulty !== this.props.difficulty ||
      this.props.newGame === true
    ) {
      this.generateBoard();
    }

    if (!isEqual(prevState.grid, this.state.grid)) {
      if (fn.verifySudoku(this.state.grid)) {
        this.setState({ complete: true });
      } else {
        this.setState({ complete: false });
      }
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
    const gridCopy = cloneDeep(this.state.grid);
    if (key === null) {
      gridCopy[row].splice(col, 1, key);
      this.setState({ grid: gridCopy });
    } else {
      const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      if (digits.indexOf(parseInt(key)) === -1) {
        this.showInvalidKeyPress();
      } else {
        gridCopy[row].splice(col, 1, key);
        this.setState({ grid: gridCopy });
      }
    }
  }

  render() {
    let error;

    if (this.state.displayError) {
      error = (
        <div className='alertConstraint'>
          <Alert theme='danger' open={this.state.displayError}>
            Must type a number between 1 and 9
          </Alert>
        </div>
      );
    }

    const { grid, complete } = this.state;
    return (
      <div className='sudoku'>
        {error}
        <div className='winCondition'>
          {complete
            ? 'You have successfully solved the sudoku!'
            : 'You are not done yet!'}
        </div>

        {grid.map((row, rowNum) => (
          <Row
            key={rowNum}
            grid={grid}
            cells={row}
            rowNum={rowNum}
            handleKeyPress={this.handleKeyPress}
          />
        ))}
      </div>
    );
  }
}

export default Board;
