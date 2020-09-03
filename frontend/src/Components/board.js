import React from 'react';
import Row from './row';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      displayError: false,
      beginTimer: 0,
      timeUntilDismissed: 3,
      complete: false,
    };
  }
  
  render() {
    const { grid, complete, handleKeyPress } = this.props;

    return (
      <div className='sudoku'>
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
            handleKeyPress={handleKeyPress}
          />
        ))}
      </div>
    );
  }
}

export default Board;
