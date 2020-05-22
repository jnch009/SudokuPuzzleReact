import React from 'react';
import Square from './square';

const Row = ({ cells = [] }) => {
  return (
    <div className='sudoku-row'>
      {cells.map(cell => (
        <Square number={cell} />
      ))}
    </div>
  );
};

export default Row;
