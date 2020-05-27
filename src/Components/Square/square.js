import React from 'react';
import { FormInput } from 'shards-react';
import fn from '../../helperFn/boardFunctions';
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
  valid: true,
};

const rowTopLeft = [0, 3, 6];
const topRightRange = [2, 5, 8];
const topBorder = [1, 4, 7];

const boxConditionLookup = disabled => {
  const boxLookup = {};

  boxLookupAssignment(
    boxLookup,
    rowTopLeft,
    rowTopLeft,
    disabled,
    tl.SquareBorderTopLeft,
    tl.DisabledTopLeft,
  );

  boxLookupAssignment(
    boxLookup,
    rowTopLeft,
    topRightRange,
    disabled,
    tr.SquareBorderTopRight,
    tr.DisabledTopRight,
  );

  boxLookupAssignment(
    boxLookup,
    topRightRange,
    rowTopLeft,
    disabled,
    bl.SquareBorderBottomLeft,
    bl.DisabledBottomLeft,
  );

  boxLookupAssignment(
    boxLookup,
    topRightRange,
    topRightRange,
    disabled,
    br.SquareBorderBottomRight,
    br.DisabledBottomRight,
  );

  boxLookupAssignment(
    boxLookup,
    rowTopLeft,
    topBorder,
    disabled,
    t.SquareBorderTop,
    t.DisabledTop,
  );

  boxLookupAssignment(
    boxLookup,
    topRightRange,
    topBorder,
    disabled,
    b.SquareBorderBottom,
    b.DisabledBottom,
  );

  boxLookupAssignment(
    boxLookup,
    topBorder,
    rowTopLeft,
    disabled,
    l.SquareBorderLeft,
    l.DisabledLeft,
  );

  boxLookupAssignment(
    boxLookup,
    topBorder,
    topRightRange,
    disabled,
    r.SquareBorderRight,
    r.DisabledRight,
  );

  return boxLookup;
};

const borderColorLookup = (row, col) => {
  return {
    [`0 0`]: 'blue',
    [`3 3`]: 'blue',
    [`6 6`]: 'blue',
    [`0 3`]: 'yellow',
    [`3 6`]: 'yellow',
    [`6 0`]: 'yellow',
  }[`${row} ${col}`];
};

const setBorderColor = (row, col) => {
  //box 1,5 or 9
  return borderColorLookup(row, col) || '#c700ff';
};

let btn;

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialSquare;
  }

  handleKeyPress = async e => {
    const { row, col, grid } = this.props;
    const number = e.key;

    //debugger;
    if (Number(number) !== Number(grid[row][col])) {
      if (!fn.isValid(grid, row, col, number)) {
        this.setState({ valid: false });
      } else {
        this.setState({ valid: true });
      }
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      this.props.pressKey(null, row, col);
    } else {
      this.props.pressKey(e.key, row, col);
      this.handleClick();
    }
  };

  handleClick = () => {
    this.setState(() => ({ edit: !this.state.edit }));
  };

  render() {
    const { row, col, number } = this.props;
    const startRow = parseInt(row / 3) * 3;
    const startCol = parseInt(col / 3) * 3;
    const boxColor = setBorderColor(startRow, startCol);
    const boxLookup = boxConditionLookup()[`${row} ${col}`] || none.noBorder;
    const boxLookupDisabled =
      boxConditionLookup(true)[`${row} ${col}`] || none.DisabledNoBorder;

    if (this.props.modify === false) {
      btn = disabledBtn(boxLookupDisabled, number, boxColor);
    } else {
      if (!this.state.edit) {
        if (!this.state.valid && this.props.number !== null) {
          btn = squareBtnDanger(boxLookup, number, this.handleClick, boxColor);
        } else {
          btn = squareBtnLight(boxLookup, number, this.handleClick, boxColor);
        }
      } else {
        btn = (
          <FormInput
            autoFocus={true}
            onBlur={this.handleClick}
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            onKeyDown={this.handleKeyPress}
            className='square'
            value={this.props.number !== null ? this.props.number : ''}
          ></FormInput>
        );
      }
    }

    return btn;
  }
}

export default Square;
