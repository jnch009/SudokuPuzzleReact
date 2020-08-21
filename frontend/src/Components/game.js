import React from 'react';
import Board from './board';
import Login from '../Components/Login/Login'
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormRadio,
} from 'shards-react';
import fn from '../helperFn/boardFunctions';
import cloneDeep from 'lodash.clonedeep';

const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9];
class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openCredits: false,
      openDifficulty: false,
      openRules: false,
      openNewGame: false,
      difficulty: 'Normal',
      newGame: false,
      solvedButton: false,
      grid: [],
    };
  }

  changeDifficulty = diff => {
    this.setState(() => ({ difficulty: diff }));
  };

  newGameAccepted = () => {
    this.setState(() => ({
      newGame: true,
      openNewGame: !this.state.openNewGame,
    }));
  };

  handleDifficultyClick = () => {
    this.setState(() => ({ openDifficulty: !this.state.openDifficulty }));
  };

  handleCreditsClick = () => {
    this.setState(() => ({ openCredits: !this.state.openCredits }));
  };

  handleRulesClick = () => {
    this.setState(() => ({ openRules: !this.state.openRules }));
  };

  handleNewGameClick = () => {
    this.setState(() => ({ openNewGame: !this.state.openNewGame }));
  };

  handleSudokuSolver = () => {
    let currentGrid = cloneDeep(this.state.grid);

    currentGrid = currentGrid.map(row =>
      row.map(el => {
        return typeof el === 'string' ? null : el;
      }),
    );
    fn.solve(currentGrid, shuffled);

    this.setState({
      grid: currentGrid,
      solvedButton: true,
    });
  };

  populateGameGrid = grid => {
    this.setState({ grid: grid, solvedButton: false, newGame: false });
  };

  render() {
    return (
      <div className='game'>
        <div className='game-title'>
          <p className='title'>SUDOKU!</p>
        </div>
        <div className='game-board'>
          <Board
            difficulty={this.state.difficulty}
            newGame={this.state.newGame}
            populateGameGrid={this.populateGameGrid}
            solvedButton={this.state.solvedButton}
            solvedGrid={this.state.grid}
          />
        </div>
        <Container className='dr-example-container'>
          <Row>
            <Col>
              <Button onClick={this.handleCreditsClick} className='navBar'>
                Credits
              </Button>
            </Col>
            <Col>
              <Button onClick={this.handleDifficultyClick} className='navBar'>
                Difficulty
              </Button>
            </Col>
            <Col>
              <Button onClick={this.handleSudokuSolver} className='navBar'>
                Solve
              </Button>
            </Col>
            <Col>
              <Button onClick={this.handleRulesClick} className='navBar'>
                How To Play
              </Button>
            </Col>
            <Col>
              <Button onClick={this.handleNewGameClick} className='navBar'>
                New Game
              </Button>
            </Col>
            <Col>
              <Login />
            </Col>
          </Row>
        </Container>

        <Modal open={this.state.openCredits} toggle={this.handleCreditsClick}>
          <ModalHeader>Credits</ModalHeader>
          <ModalBody>Developed by: Jeremy Ng Cheng Hin</ModalBody>
        </Modal>

        <Modal
          open={this.state.openDifficulty}
          toggle={this.handleDifficultyClick}
        >
          <ModalHeader>Change Difficulty</ModalHeader>
          <ModalBody>
            <FormRadio
              checked={this.state.difficulty === 'Beginner'}
              onChange={() => {
                this.changeDifficulty('Beginner');
              }}
            >
              Beginner
            </FormRadio>
            <FormRadio
              checked={this.state.difficulty === 'Easy'}
              onChange={() => {
                this.changeDifficulty('Easy');
              }}
            >
              Easy
            </FormRadio>
            <FormRadio
              checked={this.state.difficulty === 'Normal'}
              onChange={() => {
                this.changeDifficulty('Normal');
              }}
            >
              Normal
            </FormRadio>
            <FormRadio
              checked={this.state.difficulty === 'Hard'}
              onChange={() => {
                this.changeDifficulty('Hard');
              }}
            >
              Hard
            </FormRadio>
            <Button onClick={this.handleDifficultyClick}>Accept</Button>
          </ModalBody>
        </Modal>

        <Modal open={this.state.openRules} toggle={this.handleRulesClick}>
          <ModalHeader>Welcome to Sudoku!</ModalHeader>
          <ModalBody>
            <div className='rulesText'>
              <p>
                1. Only one number from 1-9 is allowed on each row<br></br>
              </p>
              <p>
                2. Only one number from 1-9 is allowed on each column<br></br>
              </p>
              <p>
                3. Only one number from 1-9 is allowed in each grid<br></br>
              </p>
              <p>
                The goal of the game is to find the missing numbers in the grid
                such that all three of these conditions are satisfied and if
                they are then you have successfully completed the puzzle.
                <br></br>
              </p>
              <p>
                If not, then you must backtrack and find out which numbers are
                inserted incorrectly.<br></br>
              </p>
              <p>
                You will know if the number is inserted incorrectly when the box
                is highlighted red.<br></br>
              </p>
            </div>
            <Button onClick={this.handleRulesClick}>Got it!</Button>
          </ModalBody>
        </Modal>

        <Modal open={this.state.openNewGame} toggle={this.handleNewGameClick}>
          <ModalBody>
            <div className='newGameText'>
              Are you sure?<br></br>
            </div>
            <div className='flexButtons'>
              <Button onClick={this.newGameAccepted}>Yes</Button>
              <Button onClick={this.handleNewGameClick}>No</Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Game;
