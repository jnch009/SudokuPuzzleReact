import React from 'react';
import { FormInput } from 'shards-react';
import './square.scss';
import boxLookupAssignment from './squareUtility';
import tl from './squareBorders/topLeft';
import tr from './squareBorders/topRight';
import t from './squareBorders/Top';
import bl from './squareBorders/bottomLeft';
import br from './squareBorders/bottomRight';
import b from './squareBorders/Bottom';
import l from './squareBorders/Left';
import r from './squareBorders/Right';
import none from './squareBorders/None';
import squareBtnLight from './squareState/Active';
import squareBtnDanger from './squareState/Danger';
import disabledBtn from './squareState/Disabled';

const initialSquare = {
  edit: false,
};

const rowTopLeft = [0, 3, 6];
const topRightRange = [2, 5, 8];
const topBorder = [1, 4, 7];

const boxConditionLookup = () => {
  const boxLookup = {};

  boxLookupAssignment(
    boxLookup,
    rowTopLeft,
    rowTopLeft,
    tl.SquareBorderTopLeft
  );

  boxLookupAssignment(
    boxLookup,
    rowTopLeft,
    topRightRange,
    tr.SquareBorderTopRight
  );

  boxLookupAssignment(
    boxLookup,
    topRightRange,
    rowTopLeft,
    bl.SquareBorderBottomLeft
  );

  boxLookupAssignment(
    boxLookup,
    topRightRange,
    topRightRange,
    br.SquareBorderBottomRight
  );

  boxLookupAssignment(boxLookup, rowTopLeft, topBorder, t.SquareBorderTop);

  boxLookupAssignment(
    boxLookup,
    topRightRange,
    topBorder,
    b.SquareBorderBottom
  );

  boxLookupAssignment(boxLookup, topBorder, rowTopLeft, l.SquareBorderLeft);
  boxLookupAssignment(boxLookup, topBorder, topRightRange, r.SquareBorderRight);

  return boxLookup;
};

const borderColorLookup = (row, col) => {
  return {
    '0 0': 'blue',
    '3 3': 'blue',
    '6 6': 'blue',
    '0 3': 'yellow',
    '3 6': 'yellow',
    '6 0': 'yellow',
  }[`${row} ${col}`];
};

const setBorderColor = (row, col) => {
  return borderColorLookup(row, col) || '#c700ff';
};

let btn;

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialSquare;
  }

  handleKeyPress = async (e) => {
    const { squareProps } = this.props;
    const number = e.key;

    if (number === 'Backspace' || number === 'Delete') {
      squareProps.pressKey(null, squareProps.row, squareProps.col);
    } else {
      squareProps.pressKey(number, squareProps.row, squareProps.col);
      this.handleClick();
    }
  };

  handleClick = () => {
    this.setState(() => ({ edit: !this.state.edit }));
  };

  render() {
    const { squareProps, modify, valid } = this.props;
    const startRow = parseInt(squareProps.row / 3) * 3;
    const startCol = parseInt(squareProps.col / 3) * 3;
    const boxColor = setBorderColor(startRow, startCol);
    const boxLookup = boxConditionLookup()[`${squareProps.row} ${squareProps.col}`] || none.noBorder;

    if (!modify) {
      btn = disabledBtn(boxLookup, squareProps.number, boxColor);
    } else {
      if (!this.state.edit) {
        if (!valid && squareProps.number !== null) {
          btn = squareBtnDanger(boxLookup, squareProps.number, this.handleClick, boxColor);
        } else {
          btn = squareBtnLight(boxLookup, squareProps.number, this.handleClick, boxColor);
        }
      } else {
        btn = (
          <FormInput
            autoFocus
            onBlur={this.handleClick}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            onKeyDown={this.handleKeyPress}
            className='square'
          />
        );
      }
    }

    return btn;
  }
}

export default Square;
