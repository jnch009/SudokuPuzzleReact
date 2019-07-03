import React from 'react';
import Board from './board';
import { Container, Row, Col, Button } from "shards-react";

class Game extends React.Component {
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
                <Col><Button className="navBar">Credits</Button></Col>
                <Col><Button className="navBar">Difficulty</Button></Col>
                <Col><Button className="navBar">How To Play</Button></Col>
                <Col><Button className="navBar">New Game</Button></Col>
              </Row>
          </Container>
        </div>
      );
    }
}

export default Game;