import React from 'react';
//import Button from 'react-bootstrap/Button';
import { FormInput, Button } from 'shards-react';
import fn from '../helperFn/boardFunctions';
import styled from 'styled-components';
import './square.scss';

const initialSquare = {
  edit: false,
  valid: true,
};

const topLeftCondition = (row, col) => {
  return rowTopLeft.includes(row) && rowTopLeft.includes(col);
};

const topRightCondition = (row, col) => {
  return rowTopLeft.includes(row) && topRightRange.includes(col);
};

const bottomLeftCondition = (row, col) => {
  return topRightRange.includes(row) && rowTopLeft.includes(col);
};

const bottomRightCondition = (row, col) => {
  return topRightRange.includes(row) && topRightRange.includes(col);
};

const topCondition = (row, col) => {
  return rowTopLeft.includes(row) && topBorder.includes(col);
};

const bottomCondition = (row, col) => {
  return topRightRange.includes(row) && topBorder.includes(col);
};

const leftCondition = (row, col) => {
  return topBorder.includes(row) && rowTopLeft.includes(col);
};

const rightCondition = (row, col) => {
  return topBorder.includes(row) && topRightRange.includes(col);
};

const rowTopLeft = [0, 3, 6];
const topRightRange = [2, 5, 8];
const topBorder = [1, 4, 7];

const boxConditionLookup = () => {
  const boxLookup = {};
  for (let rowNum = 0; rowNum < rowTopLeft.length; rowNum++) {
    for (let colNum = 0; colNum < rowTopLeft.length; colNum++) {
      boxLookup[
        `${rowTopLeft[rowNum]} ${rowTopLeft[colNum]}`
      ] = SquareBorderTopLeft;
    }
  }

  for (let rowNum = 0; rowNum < rowTopLeft.length; rowNum++) {
    for (let colNum = 0; colNum < topRightRange.length; colNum++) {
      boxLookup[
        `${rowTopLeft[rowNum]} ${topRightRange[colNum]}`
      ] = SquareBorderTopRight;
    }
  }

  for (let rowNum = 0; rowNum < topRightRange.length; rowNum++) {
    for (let colNum = 0; colNum < rowTopLeft.length; colNum++) {
      boxLookup[
        `${topRightRange[rowNum]} ${rowTopLeft[colNum]}`
      ] = SquareBorderBottomLeft;
    }
  }

  for (let rowNum = 0; rowNum < topRightRange.length; rowNum++) {
    for (let colNum = 0; colNum < topRightRange.length; colNum++) {
      boxLookup[
        `${topRightRange[rowNum]} ${topRightRange[colNum]}`
      ] = SquareBorderBottomRight;
    }
  }

  for (let rowNum = 0; rowNum < rowTopLeft.length; rowNum++) {
    for (let colNum = 0; colNum < topBorder.length; colNum++) {
      boxLookup[`${rowTopLeft[rowNum]} ${topBorder[colNum]}`] = SquareBorderTop;
    }
  }

  for (let rowNum = 0; rowNum < topRightRange.length; rowNum++) {
    for (let colNum = 0; colNum < topBorder.length; colNum++) {
      boxLookup[
        `${topRightRange[rowNum]} ${topBorder[colNum]}`
      ] = SquareBorderBottom;
    }
  }

  for (let rowNum = 0; rowNum < topBorder.length; rowNum++) {
    for (let colNum = 0; colNum < rowTopLeft.length; colNum++) {
      boxLookup[
        `${topBorder[rowNum]} ${rowTopLeft[colNum]}`
      ] = SquareBorderLeft;
    }
  }

  for (let rowNum = 0; rowNum < topBorder.length; rowNum++) {
    for (let colNum = 0; colNum < topRightRange.length; colNum++) {
      boxLookup[
        `${topBorder[rowNum]} ${topRightRange[colNum]}`
      ] = SquareBorderRight;
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
    const boxLookup = boxConditionLookup();

    //console.log(boxLookup[`${row} ${col}`]);

    if (this.props.modify === false) {
      if (topLeftCondition(row, col)) {
        btn = disabledBtn(DisabledTopLeft, number, boxColor);
      } else if (topRightCondition(row, col)) {
        btn = disabledBtn(DisabledTopRight, number, boxColor);
      } else if (bottomLeftCondition(row, col)) {
        btn = disabledBtn(DisabledBottomLeft, number, boxColor);
      } else if (bottomRightCondition(row, col)) {
        btn = disabledBtn(DisabledBottomRight, number, boxColor);
      } else if (topCondition(row, col)) {
        btn = disabledBtn(DisabledTop, number, boxColor);
      } else if (bottomCondition(row, col)) {
        btn = disabledBtn(DisabledBottom, number, boxColor);
      } else if (leftCondition(row, col)) {
        btn = disabledBtn(DisabledLeft, number, boxColor);
      } else if (rightCondition(row, col)) {
        btn = disabledBtn(DisabledRight, number, boxColor);
      } else {
        btn = (
          <Button disabled theme='dark' className='square'>
            {this.props.number}
          </Button>
        );
      }
    } else {
      if (!this.state.edit) {
        if (!this.state.valid && this.props.number !== null) {
          btn =
            boxLookup[`${row} ${col}`] !== undefined ? (
              squareBtnDanger(
                boxLookup[`${row} ${col}`],
                number,
                this.handleClick,
                boxColor,
              )
            ) : (
              <Button
                onClick={this.handleClick}
                theme='danger'
                active
                className='square danger'
              >
                {this.props.number}
              </Button>
            );
        } else {
          btn =
            boxLookup[`${row} ${col}`] !== undefined ? (
              squareBtnLight(
                boxLookup[`${row} ${col}`],
                number,
                this.handleClick,
                boxColor,
              )
            ) : (
              <Button
                onClick={this.handleClick}
                theme='light'
                className='square light'
              >
                {this.props.number}
              </Button>
            );
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
