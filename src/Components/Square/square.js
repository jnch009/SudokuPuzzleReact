import React from 'react';
import { FormInput } from 'shards-react';
import fn from '../../helperFn/boardFunctions';
import styled from 'styled-components';
import './square.scss';
import boxLookupAssignment from './squareUtility';
import tl from './squareBorders/topLeft';

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

  for (let rowNum = 0; rowNum < rowTopLeft.length; rowNum++) {
    for (let colNum = 0; colNum < topRightRange.length; colNum++) {
      boxLookup[`${rowTopLeft[rowNum]} ${topRightRange[colNum]}`] = !disabled
        ? SquareBorderTopRight
        : DisabledTopRight;
    }
  }

  for (let rowNum = 0; rowNum < topRightRange.length; rowNum++) {
    for (let colNum = 0; colNum < rowTopLeft.length; colNum++) {
      boxLookup[`${topRightRange[rowNum]} ${rowTopLeft[colNum]}`] = !disabled
        ? SquareBorderBottomLeft
        : DisabledBottomLeft;
    }
  }

  for (let rowNum = 0; rowNum < topRightRange.length; rowNum++) {
    for (let colNum = 0; colNum < topRightRange.length; colNum++) {
      boxLookup[`${topRightRange[rowNum]} ${topRightRange[colNum]}`] = !disabled
        ? SquareBorderBottomRight
        : DisabledBottomRight;
    }
  }

  for (let rowNum = 0; rowNum < rowTopLeft.length; rowNum++) {
    for (let colNum = 0; colNum < topBorder.length; colNum++) {
      boxLookup[`${rowTopLeft[rowNum]} ${topBorder[colNum]}`] = !disabled
        ? SquareBorderTop
        : DisabledTop;
    }
  }

  for (let rowNum = 0; rowNum < topRightRange.length; rowNum++) {
    for (let colNum = 0; colNum < topBorder.length; colNum++) {
      boxLookup[`${topRightRange[rowNum]} ${topBorder[colNum]}`] = !disabled
        ? SquareBorderBottom
        : DisabledBottom;
    }
  }

  for (let rowNum = 0; rowNum < topBorder.length; rowNum++) {
    for (let colNum = 0; colNum < rowTopLeft.length; colNum++) {
      boxLookup[`${topBorder[rowNum]} ${rowTopLeft[colNum]}`] = !disabled
        ? SquareBorderLeft
        : DisabledLeft;
    }
  }

  for (let rowNum = 0; rowNum < topBorder.length; rowNum++) {
    for (let colNum = 0; colNum < topRightRange.length; colNum++) {
      boxLookup[`${topBorder[rowNum]} ${topRightRange[colNum]}`] = !disabled
        ? SquareBorderRight
        : DisabledRight;
    }
  }

  return boxLookup;
};

const SquareBorderTop = styled.button`
  border-top: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderTopLeft = styled.button`
  border-top: ${props => `0.2em ${props.borderColor} solid`};
  border-left: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderTopRight = styled.button`
  border-top: ${props => `0.2em ${props.borderColor} solid`};
  border-right: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderBottomLeft = styled.button`
  border-bottom: ${props => `0.2em ${props.borderColor} solid`};
  border-left: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderBottomRight = styled.button`
  border-bottom: ${props => `0.2em ${props.borderColor} solid`};
  border-right: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderBottom = styled.button`
  border-bottom: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderLeft = styled.button`
  border-left: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderRight = styled.button`
  border-right: ${props => `0.2em ${props.borderColor} solid`};
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const noBorder = styled.button`
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const DisabledTop = styled(SquareBorderTop)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledTopLeft = styled(SquareBorderTopLeft)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledTopRight = styled(SquareBorderTopRight)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledBottomLeft = styled(SquareBorderBottomLeft)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledBottomRight = styled(SquareBorderBottomRight)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledBottom = styled(SquareBorderBottom)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledLeft = styled(SquareBorderLeft)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledRight = styled(SquareBorderRight)`
  &&& {
    cursor: not-allowed;
  }
`;

const DisabledNoBorder = styled(noBorder)`
  &&& {
    cursor: not-allowed;
  }
`;

const disabledBtn = (componentName, num, borderColor) => {
  return React.createElement(
    componentName,
    { className: 'square primary', borderColor },
    num,
  );
};

const squareBtnDanger = (componentName, num, handleClick, borderColor) => {
  return React.createElement(
    componentName,
    { onClick: handleClick, className: 'square danger', borderColor },
    num,
  );
};

const squareBtnLight = (componentName, num, handleClick, borderColor) => {
  return React.createElement(
    componentName,
    {
      onClick: handleClick,
      className: 'square light',
      modify: true,
      borderColor,
    },
    num,
  );
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
    let btn;
    const startRow = parseInt(row / 3) * 3;
    const startCol = parseInt(col / 3) * 3;
    const boxColor = setBorderColor(startRow, startCol);
    const boxLookup = boxConditionLookup()[`${row} ${col}`] || noBorder;
    const boxLookupDisabled =
      boxConditionLookup(true)[`${row} ${col}`] || DisabledNoBorder;

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
