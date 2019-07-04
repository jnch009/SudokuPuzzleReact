import React from 'react';
import Board from './board';
import { Container, Row, Col, Button,
         Modal, ModalBody, ModalHeader } from "shards-react";

class Game extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      openCredits: false,
    };

    this.handleCreditsClick = this.handleCreditsClick.bind(this);
  }

  handleCreditsClick(){
    this.setState(() => ({openCredits: !this.state.openCredits}));
  }

  render() {
      return (
        <div className="game">
          <div className="game-title">
            <p className="title">SUDOKU!</p>
          </div>
          <div className="game-board">
            <Board/>
          </div>
          <Container className="dr-example-container">
              <Row>
                <Col><Button onClick={this.handleCreditsClick} className="navBar">Credits</Button></Col>
                <Col><Button className="navBar">Difficulty</Button></Col>
                <Col><Button className="navBar">How To Play</Button></Col>
                <Col><Button className="navBar">New Game</Button></Col>
              </Row>
          </Container>
          <Modal open={this.state.openCredits} toggle={this.handleCreditsClick}>
            <ModalHeader>Credits</ModalHeader>
            <ModalBody>Developed by: Jeremy Ng Cheng Hin</ModalBody>
          </Modal>
        </div>
      );
    }
}

export default Game;