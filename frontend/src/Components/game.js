import React from 'react';
import Board from './board';
import SideNav from '../Components/SideNav/SideNav';
import NavBar from '../Components/NavBar/NavBar';
import ModalCredits from '../Components/Modals/ModalCredits';
import ModalDifficulty from '../Components/Modals/ModalDifficulty';

import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Button, Modal, ModalBody, ModalHeader } from 'shards-react';
import fn from '../helperFn/boardFunctions';
import cloneDeep from 'lodash.clonedeep';
import { withAuth0 } from '@auth0/auth0-react';
import { withRouter } from 'react-router';

const shuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const protectedRoutes = ['/profile'];

const initialState = {
  openCredits: false,
  openDifficulty: false,
  openRules: false,
  openNewGame: false,
  difficulty: 'Normal',
  newGame: false,
  solvedButton: false,
  showHamburger: false,
  showSideNav: false,
  grid: [],
};

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  routeChangeHandler = (route) => {
    switch (true) {
    case route === '/credits':
      this.handleCreditsClick();
      break;
    case route === '/difficulty':
      this.handleDifficultyClick();
      break;
    case route === '/rules':
      this.handleRulesClick();
      break;
    case route === '/newGame':
      this.handleNewGameClick();
      break;
    case !this.props.auth0.isAuthenticated && protectedRoutes.includes(route):
      this.props.history.replace('/');
      break;
    default:
      this.setState({
        openCredits: false,
        openDifficulty: false,
        openRules: false,
        openNewGame: false,
      });
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.setHamburgerVisibility);
    this.setHamburgerVisibility();
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

  setHamburgerVisibility = () => {
    if (window.innerWidth <= 580) {
      this.setState({
        showHamburger: true,
      });
    } else {
      this.setState(() => ({
        showHamburger: false,
      }));
    }
  };

  setSidebarVisibility = () => {
    this.setState({
      showSideNav: !this.state.showSideNav,
    });
  };

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
    const { showHamburger, showSideNav } = this.state;
    const navClickHandlers = {
      handleCreditsClick: this.handleCreditsClick,
      handleDifficultyClick: this.handleDifficultyClick,
      handleSudokuSolver: this.handleSudokuSolver,
      handleRulesClick: this.handleRulesClick,
      handleNewGameClick: this.handleNewGameClick,
    };

    if (isLoading) {
      return <h1>Loading</h1>;
    }

    return (
      <>
        <CSSTransition
          in={showSideNav}
          timeout={200}
          classNames='my-node'
          unmountOnExit
        >
          <SideNav
            isAuthenticated={isAuthenticated}
            navClickHandlers={navClickHandlers}
            setSidebarVisibility={this.setSidebarVisibility}
          />
        </CSSTransition>

        {!showHamburger ? (
          <NavBar
            isAuthenticated={isAuthenticated}
            navClickHandlers={navClickHandlers}
          />
        ) : (
          <div className='d-flex justify-content-center'>
            <Button onClick={this.setSidebarVisibility}>
              <FontAwesomeIcon icon={faBars} size='3x' />
            </Button>
          </div>
        )}

        <ModalCredits
          openCredits={this.state.openCredits}
          handleCreditsClick={this.handleCreditsClick}
        />

        <ModalDifficulty
          openDifficulty={this.state.openDifficulty}
          handleDifficultyClick={this.handleDifficultyClick}
          difficulty={this.state.difficulty}
          changeDifficulty={this.changeDifficulty}
        />

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
          <h1>SUDOKU!</h1>
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
