import React from 'react';
import Board from './board';
import SavedGames from '../Components/SavedGames/SavedGames';
import { Button } from 'shards-react';
import fn from '../helperFn/boardFunctions';
import cloneDeep from 'lodash.clonedeep';
import { withAuth0 } from '@auth0/auth0-react';
import { withRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import SideNav from '../Components/SideNav/SideNav';
import NavBar from '../Components/NavBar/NavBar';
import ModalCredits from '../Components/Modals/ModalCredits';
import ModalDifficulty from '../Components/Modals/ModalDifficulty';
import ModalRules from '../Components/Modals/ModalRules';
import ModalNewGame from '../Components/Modals/ModalNewGame';
import ModalSaveGame from '../Components/Modals/ModalSaveGame';

import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const initialState = {
  openCredits: false,
  openDifficulty: false,
  openRules: false,
  openNewGame: false,
  openSaveGame: false,
  difficulty: 'Normal',
  newGame: false,
  solvedButton: false,
  manageGames: false,
  showHamburger: false,
  showSideNav: false,
  grid: [],
  displayError: false,
  beginTimer: 0,
  timeUntilDismissed: 3,
  complete: false,
};

class Game extends React.PureComponent {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = initialState;
  }

  componentDidMount() {
    window.addEventListener('resize', this.setHamburgerVisibility);
    if (sessionStorage.getItem('grid') && sessionStorage.getItem('difficulty')) {
      this.setState({
        grid: JSON.parse(sessionStorage.getItem('grid')),
        difficulty: sessionStorage.getItem('difficulty'),
      });
    } else {
      this.generateBoard();
    }
    this.setHamburgerVisibility();
  }

  componentDidUpdate(prevState) {
    if (this.props.location.pathname === '/save'){
      this.setState({ openSaveGame: true }, () => {
        this.props.history.replace('/');
      });
    }

    if (prevState.grid !== this.state.grid) {
      sessionStorage.setItem('grid', JSON.stringify(this.state.grid));
      sessionStorage.setItem('difficulty', this.state.difficulty);
      this.setState({ complete: fn.verifySudoku(this.state.grid) });
    }
  }

  setHamburgerVisibility = () => {
    if (window.innerWidth <= 680) {
      this.setState({ showHamburger: true });
    } else {
      this.setState(() => ({ showHamburger: false }));
    }
  };

  setSidebarVisibility = () => {
    this.setState({ showSideNav: !this.state.showSideNav });
  };

  changeDifficulty = (diff) => {
    this.setState(() => ({ difficulty: diff }), () => {
      sessionStorage.setItem('difficulty',this.state.difficulty);
      this.generateBoard();
    });
  };

  newGameAccepted = () => {
    this.setState(() => ({ newGame: true, openNewGame: !this.state.openNewGame }), 
      () => { 
        this.generateBoard(); 
      });
  };

  redirectToGrid = () => {
    if (this.props.location.pathname !== '/save' && this.props.location.pathname !== '/'){
      this.props.history.push('/');
    } 
  }

  handleDifficultyClick = () => {
    this.setState(() => ({ openDifficulty: !this.state.openDifficulty }), () => {
      this.redirectToGrid();
    });
  };

  handleCreditsClick = () => {
    this.setState(() => ({ openCredits: !this.state.openCredits }), () => {
      this.redirectToGrid();
    });
  };

  handleRulesClick = () => {
    this.setState(() => ({ openRules: !this.state.openRules }), () => {
      this.redirectToGrid();
    });
  };

  handleManageSavesClick = () => {
    this.setState(
      () => ({ manageGames: !this.state.manageGames }), () => {
        this.redirectToGrid();
      }
    );
  };

  handleNewGameClick = () => {
    this.setState(() => ({ openNewGame: !this.state.openNewGame }), () => {
      this.redirectToGrid();
    });
  };

  handleSudokuSolver = () => {
    this.redirectToGrid();
    let currentGrid = cloneDeep(this.state.grid);

    currentGrid = currentGrid.map((row) =>
      row.map((el) => {
        return typeof el === 'string' ? null : el;
      })
    );
    fn.solve(currentGrid, digits);

    this.setState({ grid: currentGrid });
  };

  handleSaveGameClick = () => {
    this.setState(() => ({ openSaveGame: !this.state.openSaveGame }), () => {
      this.redirectToGrid();
    });
  }

  handleTimeChange = () => {
    if (this.state.beginTimer < this.state.timeUntilDismissed - 1) {
      this.setState({ ...this.state, ...{ beginTimer: this.state.beginTimer + 1 } });
      return;
    }

    this.setState({ ...this.state, ...{ displayError: false } });
    this.clearInterval();
  };

  handleKeyPress = (key, row, col) => {
    const gridCopy = cloneDeep(this.state.grid);
    if (key === null) {
      gridCopy[row].splice(col, 1, key);
      this.setState({ grid: gridCopy });
    } else {
      if (digits.indexOf(parseInt(key)) === -1) {
        this.showInvalidKeyPress();
      } else {
        gridCopy[row].splice(col, 1, key);
        this.setState({ grid: gridCopy });
      }
    }
  };

  generateBoard = () => {
    let gridNewly = fn.createGrid();
    fn.solve(gridNewly, fn.shuffle(digits));
    fn.removingEntries(gridNewly, this.state.difficulty);

    this.setState({ grid: gridNewly });
  };

  clearInterval = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  showInvalidKeyPress = () => {
    this.clearInterval();
    this.setState({ displayError: true, beginTimer: 0, timeUntilDismissed: 3 });
    this.interval = setInterval(this.handleTimeChange, 1000);
  };

  render() {
    const { isAuthenticated, isLoading, error } = this.props.auth0;
    const {
      showHamburger,
      showSideNav,
      grid,
      displayError,
      difficulty,
    } = this.state;
    const navClickHandlers = {
      handleCreditsClick: this.handleCreditsClick,
      handleDifficultyClick: this.handleDifficultyClick,
      handleSudokuSolver: this.handleSudokuSolver,
      handleRulesClick: this.handleRulesClick,
      handleNewGameClick: this.handleNewGameClick,
      handleSaveGameClick: this.handleSaveGameClick
    };

    if (isLoading) {
      return (
        <h1 className='h-100 m-0 d-flex justify-content-center align-items-center text-white'>
          Loading...
        </h1>
      );
    } else if (error) {
      return <div>Oops... {error.message}</div>;
    } else {
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
              difficulty={difficulty}
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

          <ModalRules
            openRules={this.state.openRules}
            handleRulesClick={this.handleRulesClick}
          />

          <ModalNewGame
            openNewGame={this.state.openNewGame}
            handleNewGameClick={this.handleNewGameClick}
            newGameAccepted={this.newGameAccepted}
          />

          <ModalSaveGame open={this.state.openSaveGame} setOpen={this.handleSaveGameClick} />

          <Switch>
            <PrivateRoute
              path='/manageSaves'
              component={SavedGames}
              open={this.state.manageGames}
              toggle={this.handleManageSavesClick}
            />
            <PrivateRoute
              path='/save'
              component={Board}
              grid={grid}
              complete={this.state.complete}
              displayError={displayError}
              handleKeyPress={this.handleKeyPress}
            />
            <Route
              path='/'
              render={() => (
                <Board
                  grid={grid}
                  complete={this.state.complete}
                  displayError={displayError}
                  handleKeyPress={this.handleKeyPress}
                />
              )}
            />
          </Switch>
        </>
      );
    }
  }
}

export default withRouter(withAuth0(Game));
