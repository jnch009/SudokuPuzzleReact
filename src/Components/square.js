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
    if (digits.indexOf(parseInt(e.target.value)) !== -1){
      this.setState({value: e.target.value});
    }
  }
  
  render(){
    return(
      /*<Button theme="light" active="true" className="square" onClick={this.handleClick}>
        {this.props.number}
      </Button>*/
      <input className="square" onBlur={this.handleClick} onChange={this.handleInput}>
        {this.props.number}
      </input>
    );
  }
}

export {Square,ActiveSquare};