import React from "react";
//import Button from 'react-bootstrap/Button';
import { FormInput, Button } from "shards-react";
import fn from "../helperFn/boardFunctions";

class Square extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      valid: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    //e.preventDefault();
    const rowNumber = this.props.row;
    const colNumber = this.props.col;
    const grid = this.props.grid;
    const box = this.props.boxNumber;
    const keyPressed = parseInt(e.nativeEvent.data);

    var beginRow = fn.selectRow(box);
    var beginCol = fn.selectCol(box);

    if (
      !fn.insertConstraint(grid, rowNumber, colNumber, keyPressed) ||
      !fn.insertIntoBox(grid, beginRow, beginCol, keyPressed)
    ) {
      this.setState({ valid: false });
    } else {
      this.setState({ valid: true });
    }

    if (e.nativeEvent.data === "Backspace" || e.nativeEvent.data === "Delete") {
      this.props.pressKey(null, rowNumber, colNumber);
    } else {
      this.props.pressKey(e.nativeEvent.data, rowNumber, colNumber);
      this.handleClick();
    }
  }

  handleClick() {
    this.setState(() => ({ edit: !this.state.edit }));
  }

  render() {
    let btn;
    if (this.props.modify === false) {
      btn = (
        <Button disabled theme="dark" className="square">
          {this.props.number}
        </Button>
      );
    } else {
      if (!this.state.edit) {
        if (!this.state.valid) {
          btn = (
            <Button
              onClick={this.handleClick}
              theme="danger"
              active
              className="square"
            >
              {this.props.number}
            </Button>
          );
        } else {
          btn = (
            <Button onClick={this.handleClick} theme="light" className="square">
              {this.props.number}
            </Button>
          );
        }
      } else {
        btn = (
          <FormInput
            autoFocus={true}
            onBlur={this.handleClick}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={(e) => this.handleKeyPress(e)}
            className="square"
            value={this.props.number !== null ? this.props.number : ""}
          ></FormInput>
        );
      }
    }

    return btn;
  }
}

export default Square;
