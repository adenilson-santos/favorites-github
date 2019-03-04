import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Main from "./pages/Main";
import Favorites from "./pages/Favorites";

import GlobalStyle from "./style/GlobalStyle";

import store from "./store";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/favorites" component={Favorites} />
      </Switch>
      <Footer />
    </Provider>
  </BrowserRouter>
);

export default App;
