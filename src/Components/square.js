import React from 'react';
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
  render(){
    return(
      <Button theme="light" active="true" className="square">
        {this.props.number}
      </Button>
    );
  }
}

export {Square,ActiveSquare};