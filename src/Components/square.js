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

const rowTopLeft = [0, 3, 6];
const topRightRange = [2, 5, 8];

const SquareBorderTopLeft = styled.button`
  border-top: 0.2em red solid;
  border-left: 0.2em red solid;
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderTopRight = styled.button`
  border-top: 0.2em red solid;
  border-right: 0.2em red solid;
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
`;

const SquareBorderBottomLeft = styled.button`
  border-bottom: 0.2em red solid;
  border-left: 0.2em red solid;
  color: ${props => (props.modify ? null : '#fff')};
  opacity: ${props => (props.children !== null ? 0.65 : 1)};
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

const disabledBtn = (componentName, num) => {
  return React.createElement(
    componentName,
    { className: 'square primary' },
    num,
  );
};

const squareBtnDanger = (componentName, num, handleClick) => {
  return React.createElement(
    componentName,
    { onClick: handleClick, className: 'square danger' },
    num,
  );
};

const squareBtnLight = (componentName, num, handleClick) => {
  return React.createElement(
    componentName,
    { onClick: handleClick, className: 'square light', modify: true },
    num,
  );
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

    if (this.props.modify === false) {
      if (topLeftCondition(row, col)) {
        btn = disabledBtn(DisabledTopLeft, number);
      } else if (topRightCondition(row, col)) {
        btn = disabledBtn(DisabledTopRight, number);
      } else if (bottomLeftCondition(row, col)) {
        btn = disabledBtn(DisabledBottomLeft, number);
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
            btn = squareBtnDanger(SquareBorderTopLeft, number, this.handleClick);
          } else if (topRightCondition(row, col)) {
            btn = squareBtnDanger(SquareBorderTopRight, number, this.handleClick);
          } else if (bottomLeftCondition(row, col)) {
            btn = squareBtnDanger(SquareBorderBottomLeft, number, this.handleClick);
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
            btn = squareBtnLight(SquareBorderTopLeft,number,this.handleClick)
          } else if (topRightCondition(row, col)) {
            btn = squareBtnLight(SquareBorderTopRight, number, this.handleClick);
          } else if (bottomLeftCondition(row, col)) {
            btn = squareBtnLight(SquareBorderBottomLeft, number, this.handleClick);
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
