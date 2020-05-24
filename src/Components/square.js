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

const bottomCondition = (row,col) => {
  return topRightRange.includes(row) && topBorder.includes(col);
}

const rowTopLeft = [0, 3, 6];
const topRightRange = [2, 5, 8];
const topBorder = [1, 4, 7];

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

const setBorderColor = (row, col) => {
  //box 1,5 or 9
  if (
    (row === 0 && col === 0) ||
    (row === 3 && col === 3) ||
    (row === 6 && col === 6)
  ) {
    return 'blue';
  } //box 2,6, or 7
  else if (
    (row === 0 && col === 3) ||
    (row === 3 && col === 6) ||
    (row === 6 && col === 0)
  ) {
    return 'yellow';
  } else {
    return '#c700ff';
  }
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
      } else if (bottomCondition(row,col)){
        btn = disabledBtn(DisabledBottom, number, boxColor);
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
          if (topLeftCondition(row, col)) {
            btn = squareBtnDanger(
              SquareBorderTopLeft,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (topRightCondition(row, col)) {
            btn = squareBtnDanger(
              SquareBorderTopRight,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (bottomLeftCondition(row, col)) {
            btn = squareBtnDanger(
              SquareBorderBottomLeft,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (bottomRightCondition(row, col)) {
            btn = squareBtnDanger(
              SquareBorderBottomRight,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (topCondition(row, col)) {
            btn = squareBtnDanger(
              SquareBorderTop,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (bottomCondition(row,col)){
            btn = squareBtnDanger(
              SquareBorderBottom,
              number,
              this.handleClick,
              boxColor,
            );
          } else {
            btn = (
              <Button
                onClick={this.handleClick}
                theme='danger'
                active
                className='square danger'
              >
                {this.props.number}
              </Button>
            );
          }
        } else {
          if (topLeftCondition(row, col)) {
            btn = squareBtnLight(
              SquareBorderTopLeft,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (topRightCondition(row, col)) {
            btn = squareBtnLight(
              SquareBorderTopRight,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (bottomLeftCondition(row, col)) {
            btn = squareBtnLight(
              SquareBorderBottomLeft,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (bottomRightCondition(row, col)) {
            btn = squareBtnLight(
              SquareBorderBottomRight,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (topCondition(row, col)) {
            btn = squareBtnLight(
              SquareBorderTop,
              number,
              this.handleClick,
              boxColor,
            );
          } else if (bottomCondition(row,col)){
            btn = squareBtnLight(
              SquareBorderBottom,
              number,
              this.handleClick,
              boxColor,
            );
          } else {
            btn = (
              <Button
                onClick={this.handleClick}
                theme='light'
                className='square light'
              >
                {this.props.number}
              </Button>
            );
          }
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
