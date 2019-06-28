import React from 'react';
//import Button from 'react-bootstrap/Button';
import {FormInput, Button } from "shards-react";

class Square extends React.Component{
  render(){
    return(
      <Button disabled theme="dark" active="true" className="square">
        {this.props.number}
      </Button>
    );
  }
}

class ActiveSquare extends React.Component{
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e){
    console.log(e);
    e.preventDefault();
    const rowNumber = this.props.row;
    const colNumber = this.props.col;
    const keyPressed = parseInt(e.key);
    var digits = [1,2,3,4,5,6,7,8,9];
    if (digits.indexOf(keyPressed) !== -1 || e.key === "Backspace" || e.key === "Delete"){
      //this.setState({value: e.key});
      this.props.pressKey(keyPressed,rowNumber,colNumber);
    }/* else if (e.key === "Backspace" || e.key === "Delete") {
      this.setState({value: ''});
    }*/
  }
  
  render(){
    //const rowNumber = this.props.row;
    //const colNumber = this.props.col;
    return(
        <FormInput className="square"
                   onKeyDown={(e)=>this.handleKeyPress(e)}>
            {this.props.number}
        </FormInput>
    );
  }
}

export {Square,ActiveSquare};