import React from 'react';
//import Button from 'react-bootstrap/Button';
import { FormInput, Button } from 'shards-react';
import fn from '../helperFn/boardFunctions';

const initialSquare = {
  edit: false,
  valid: true,
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
    let btn;
    if (this.props.modify === false) {
      btn = (
        <Button disabled theme='dark' className='square'>
          {this.props.number}
        </Button>
      );
    } else {
      if (!this.state.edit) {
        if (!this.state.valid && this.props.number !== null) {
          btn = (
            <Button
              onClick={this.handleClick}
              theme='danger'
              active
              className='square'
            >
              {this.props.number}
            </Button>
          );
        } else {
          btn = (
            <Button onClick={this.handleClick} theme='light' className='square'>
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
