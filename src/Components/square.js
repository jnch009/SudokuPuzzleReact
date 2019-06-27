import React from 'react';
//import Button from 'react-bootstrap/Button';
import { Button } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

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