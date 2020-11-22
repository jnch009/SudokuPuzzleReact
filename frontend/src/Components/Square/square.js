import React from 'react';
import { FormInput } from 'shards-react';
import './square.scss';
import { setBorderColor } from './squareUtility';

import noBorder from './squareBorders/None';
import squareBtnLight from './squareState/Active';
import squareBtnDanger from './squareState/Danger';
import disabledBtn from './squareState/Disabled';

let btn;
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
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
    const boxLookup = squareProps.boxLookup[`${squareProps.row} ${squareProps.col}`] || noBorder;

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
