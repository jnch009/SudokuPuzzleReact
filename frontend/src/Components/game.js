import React from 'react';
import Board from './board';
import SavedGames from '../Components/SavedGames/SavedGames';
import { Button } from 'shards-react';
import fn from '../helperFn/boardFunctions';
import cloneDeep from 'lodash.clonedeep';
import queryString from 'query-string';
import { withAuth0 } from '@auth0/auth0-react';
import { withRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import SideNav from '../Components/SideNav/SideNav';
import NavBar from '../Components/NavBar/NavBar';
import ModalCredits from '../Components/Modals/ModalCredits';
import ModalDifficulty from '../Components/Modals/ModalDifficulty';
import ModalRules from '../Components/Modals/ModalRules';
import ModalNewGame from '../Components/Modals/ModalNewGame';
import Difficulties from '../helperFn/difficultyLookup';

import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const initialState = {
  openCredits: false,
  openDifficulty: false,
  openRules: false,
  openNewGame: false,
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

  routeChangeHandler = (route, queryDifficulty, querySaves) => {
    const routeToRedirect = `${route}?d=${queryDifficulty || this.state.difficulty}`;
    this.setState(
      {
        openCredits: false,
        openDifficulty: false,
        openRules: false,
        openNewGame: false,
      },
      () => {
        switch (true) {
        case route === '/credits':
          this.props.history.replace(routeToRedirect);
          this.handleCreditsClick();
          break;
        case route === '/difficulty':
          this.props.history.replace(routeToRedirect);
          this.handleDifficultyClick();
          break;
        case route === '/rules':
          this.props.history.replace(routeToRedirect);
          this.handleRulesClick();
          break;
        case route === '/newGame':
          this.props.history.replace(routeToRedirect);
          this.handleNewGameClick();
          break;
        case route === '/manageSaves':
          this.props.history.replace(
            `${route}?d=${queryDifficulty || this.state.difficulty}&saves=${querySaves || 1}`
          );
          break;
        default:
          this.props.history.replace(
            `?d=${queryDifficulty || this.state.difficulty}`
          );
        }
      }
    );
  };

  componentDidMount() {
    window.addEventListener('resize', this.setHamburgerVisibility);
    const querySaves = Number(
      queryString.parse(this.props.location.search)['saves']
    );
    let queryDifficulty = queryString.parse(this.props.location.search)['d'];
    queryDifficulty = Difficulties.includes(queryDifficulty) ? queryDifficulty : sessionStorage.getItem('difficulty');

    if (
      sessionStorage.getItem('grid') && sessionStorage.getItem('difficulty')
    ) {
      this.setState(
        {
          grid: JSON.parse(sessionStorage.getItem('grid')),
          difficulty: sessionStorage.getItem('difficulty'),
        },
        () => {
          this.routeChangeHandler(
            this.props.location.pathname,
            queryDifficulty,
            querySaves
          );
        }
      );
    } else {
      this.generateBoard();
      this.routeChangeHandler(
        this.props.location.pathname,
        queryDifficulty,
        querySaves
      );
    }
    this.setHamburgerVisibility();
  }

  componentDidUpdate(prevProps, prevState) {
    const queryDifficulty = queryString.parse(this.props.location.search)['d'];
    const querySaves = Number(
      queryString.parse(this.props.location.search)['saves']
    );

    if (this.props.history.action === 'POP') {
      if (
        Difficulties.includes(queryDifficulty) && queryDifficulty !== sessionStorage.getItem('difficulty')
      ) {
        this.setState(
          {
            difficulty: queryDifficulty,
          },
          () => {
            this.generateBoard();
          }
        );
      }

      if (prevProps.location.pathname !== this.props.location.pathname) {
        this.routeChangeHandler(
          this.props.location.pathname,
          queryDifficulty,
          querySaves
        );
      }
    } else if (
      prevState.difficulty !== this.state.difficulty || this.state.newGame === true
    ) {
      this.setState(
        {
          complete: false,
          newGame: false,
        },
        () => {
          this.generateBoard();
        }
      );
    } else if (prevState.grid !== this.state.grid) {
      this.setState({ complete: fn.verifySudoku(this.state.grid) });
    }
  }

  setHamburgerVisibility = () => {
    if (window.innerWidth <= 650) {
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
    this.setState(
      () => ({ difficulty: diff }),
      () => {
        this.props.history.push(`/difficulty?d=${this.state.difficulty}`);
      }
    );
  };

  routeChangeCallback = (stateCondition, route) => {
    if (stateCondition && this.props.location.pathname === route) {
      this.props.history.push(`/?d=${this.state.difficulty}`);
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

  handleManageSavesClick = () => {
    this.setState(
      () => ({ manageGames: !this.state.manageGames }),
      () => this.routeChangeCallback(!this.state.manageGames, '/manageSaves')
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
    fn.solve(currentGrid, digits);

    this.setState({
      grid: currentGrid,
    });
  };

  handleTimeChange = () => {
    if (this.state.beginTimer < this.state.timeUntilDismissed - 1) {
      this.setState({
        ...this.state,
        ...{ beginTimer: this.state.beginTimer + 1 },
      });
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

    this.setState(
      {
        grid: gridNewly,
      },
      () => {
        sessionStorage.setItem('grid', JSON.stringify(this.state.grid));
        sessionStorage.setItem('difficulty', this.state.difficulty);
      }
    );
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

          <Switch>
            <PrivateRoute
              path='/manageSaves'
              component={SavedGames}
              open={this.state.manageGames}
              toggle={this.handleManageSavesClick}
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
