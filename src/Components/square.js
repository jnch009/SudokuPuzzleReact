import React from 'react';
//import Button from 'react-bootstrap/Button';
import { Button } from "shards-react";

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
    
    this.state = {value: ''};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleClick() {
    alert('this is: '+ this.state.value);
  }

  handleInput(e){
    e.preventDefault();
    var digits = [1,2,3,4,5,6,7,8,9];
    if (digits.indexOf(parseInt(e.key)) !== -1){
      this.setState({value: e.key});
    } else if (e.key === "Backspace") {
      this.setState({value: ''});
    }
  }
  
  render(){
    return(
      /*<Button theme="light" active="true" className="square" onClick={this.handleClick}>
        {this.props.number}
      </Button>*/
      <input className="square" value={this.state.value} onBlur={this.handleClick} onKeyDown={this.handleInput}>
        {this.props.number}
      </input>
    );
  }
}

export {Square,ActiveSquare};