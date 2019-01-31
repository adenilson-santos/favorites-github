import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Favorites from './pages/Favorites';

import GlobalStyle from './style/GlobalStyle';

import Nav from './components/Nav';
import Footer from './components/Footer';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <GlobalStyle />
      <Nav />
      <Switch>
        <Route exact path ='/' component={Main} />
        <Route exact path ='/favorites' component={Favorites} />
      </Switch>
      <Footer/>
    </Fragment>
  </BrowserRouter>
)

export default App;
