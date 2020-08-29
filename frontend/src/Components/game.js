import React from 'react';
import Board from './board';
import Login from '../Components/Login/Login';
import Logout from '../Components/Logout/Logout';
import Profile from '../Components/Profile/Profile';
import SideNav from '../Components/SideNav/SideNav';

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
import { withAuth0 } from '@auth0/auth0-react';
import { withRouter, Switch } from 'react-router';

import { Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const initialState = {
  openCredits: false,
  openDifficulty: false,
  openRules: false,
  openNewGame: false,
  difficulty: 'Normal',
  newGame: false,
  solvedButton: false,
  grid: [],
};

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  routeChangeHandler = (route) => {
    switch (route) {
    case '/credits':
      this.handleCreditsClick();
      break;
    case '/difficulty':
      this.handleDifficultyClick();
      break;
    case '/rules':
      this.handleRulesClick();
      break;
    case '/newGame':
      this.handleNewGameClick();
      break;
    case '/profile':
      this.props.history.replace('/');
      break;
    default:
      this.setState(initialState);
    }
  };

  componentDidMount() {
    this.routeChangeHandler(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      this.props.history.action === 'POP'
    ) {
      this.routeChangeHandler(this.props.location.pathname);
    }
  }

  changeDifficulty = (diff) => {
    this.setState(() => ({ difficulty: diff }));
  };

  routeChangeCallback = (stateCondition, route) => {
    if (stateCondition && this.props.location.pathname === route) {
      this.props.history.push('/');
    }
  };

  newGameAccepted = () => {
    this.setState(
      () => ({
        newGame: true,
        openNewGame: !this.state.openNewGame,
      }),
      () => this.routeChangeCallback(!this.state.openNewGame, '/newGame')
    );
  };

  handleDifficultyClick = () => {
    this.setState(
      () => ({ openDifficulty: !this.state.openDifficulty }),
      () => this.routeChangeCallback(!this.state.openDifficulty, '/difficulty')
    );
  };

  handleCreditsClick = () => {
    this.setState(
      () => ({
        openCredits: !this.state.openCredits,
      }),
      () => this.routeChangeCallback(!this.state.openCredits, '/credits')
    );
  };

  handleRulesClick = () => {
    this.setState(
      () => ({ openRules: !this.state.openRules }),
      () => this.routeChangeCallback(!this.state.openRules, '/rules')
    );
  };

  handleNewGameClick = () => {
    this.setState(
      () => ({ openNewGame: !this.state.openNewGame }),
      () => this.routeChangeCallback(!this.state.openNewGame, '/newGame')
    );
  };

  handleSudokuSolver = () => {
    let currentGrid = cloneDeep(this.state.grid);

    currentGrid = currentGrid.map((row) =>
      row.map((el) => {
        return typeof el === 'string' ? null : el;
      })
    );
    fn.solve(currentGrid, shuffled);

    this.setState({
      grid: currentGrid,
      solvedButton: true,
    });
  };

  populateGameGrid = (grid) => {
    this.setState({ grid: grid, solvedButton: false, newGame: false });
  };

  render() {
    const { isAuthenticated, isLoading } = this.props.auth0;

    if (isLoading) {
      return <h1>Loading</h1>;
    }

    return (
      <>
      {/* <SideNav /> */}
          <Container>
            <Row>
              <Col>
                <Link to='/credits'>
                  <Button onClick={this.handleCreditsClick} className='navBar'>
                  Credits
                  </Button>
                </Link>
              </Col>
              <Col>
                <Link to='/difficulty'>
                  <Button onClick={this.handleDifficultyClick} className='navBar'>
                  Difficulty
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button onClick={this.handleSudokuSolver} className='navBar'>
                Solve
                </Button>
              </Col>
              <Col>
                <Link to='/rules'>
                  <Button onClick={this.handleRulesClick} className='navBar'>
                  How To Play
                  </Button>
                </Link>
              </Col>
              <Col>
                <Link to='/profile'>
                  <Button className='navBar'>Profile</Button>
                </Link>
              </Col>
              <Col>
                <Link to='/newGame'>
                  <Button onClick={this.handleNewGameClick} className='navBar'>
                  New Game
                  </Button>
                </Link>
              </Col>
              <Col>{isAuthenticated ? <Logout /> : <Login />}</Col>
            </Row>

            <Switch>
              <PrivateRoute path='/profile' component={Profile} />
            </Switch>
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
              Are you sure?
                <br />
              </div>
              <div className='flexButtons'>
                <Button onClick={this.newGameAccepted}>Yes</Button>
                <Button onClick={this.handleNewGameClick}>No</Button>
              </div>
            </ModalBody>
          </Modal>
                  <div className='game'>
          <p className='game-title title'>SUDOKU!</p>
          <div className='game-board'>
            <Board
              difficulty={this.state.difficulty}
              newGame={this.state.newGame}
              populateGameGrid={this.populateGameGrid}
              solvedButton={this.state.solvedButton}
              solvedGrid={this.state.grid}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(withAuth0(Game));
