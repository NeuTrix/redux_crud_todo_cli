// core react
import React from 'react';
import ReactDom from 'react-dom';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// components


import FlashMessageList from './components/messages/FlashMessageList';
import Home from './components/main/Home';
import LoginPage from './components/auth/LoginPage';
import NavBar from './components/main/NavBar';
import MenuDrawer from './components/main/MenuDrawer';
// import Navigation from './main/Navigation';
// import NavTest from './components/main/NavTest';
import RegisterPage from './components/auth/RegisterPage';
import TodoPage from './components/todos/TodoPage';
// functions
import { logout } from './actions/loginActions';
import requireAuth from './helpers/requireAuth';
import styled from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';


// fontawesome imports and other styles
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { faBars, faChartLine, faChartBar, faCheckSquare, faCog, faEllipsisH, faTasks, faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
// add to fontawesome library for the app scope
library.add( fab, faBars, faChartLine, faChartBar, faCog, faCheckSquare, faEllipsisH, faTasks, faTachometerAlt,
);

// ===> CSS
const Grid =styled.div `
  grid-template-areas:   
    " navBar " 
    " messages "  
    " main "  
  ;
  grid-template-rows: auto;
  grid-gap: 10px;

  display: grid;
  font-family: arial;
  margin-top: 50px;
  padding: 0px 10px 0px 10px;
`;
const Messages = styled.div `grid-area: messages;`;
const Main = styled.div `grid-area: main;`;
// material-ui custom styling

// ==== main Component
const App = (props) => {
  const { authApi, logout} = props;
  const auth = authApi.isAuthenticated;

  return (
    <Grid className='App' >
      <CssBaseline/> 
      <MenuDrawer auth={ auth } logout={ logout } />
      <Messages className='Messages'>
        <FlashMessageList/>
      </Messages>
      <Main className='Main'>
        <Route exact path='/' render={ () =>
          <Home authorized={ auth } />}
        />
        <Route path='/login' component={ LoginPage } />
        <Route path='/register' component={ RegisterPage } />
        <Route
          exact path='/todos'
          component={ requireAuth(ReactDom.render = (props) =>
            <TodoPage className='TodoPage' />
          )}
        />
      </Main>
    </Grid>
  );
};
// ===== Props
App.propTypes = {
  authApi: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return { logout: () => { dispatch(logout()); } };
};

const mapStateToProps = (state) => {
  return { authApi: state.authApi };
};
// =====
export default connect(mapStateToProps, mapDispatchToProps)(App);
