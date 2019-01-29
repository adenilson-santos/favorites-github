import React, { Fragment, Component } from 'react';

import {NavStyle,Icons} from './style';

class Nav extends Component {

  state = {
    favoritesLenght: 0
  }

  componentDidMount () {
    this.setState({favoritesLenght:this.getFavorites() })
  }

  getFavorites = () =>  {
    if(JSON.parse(localStorage.getItem(('@myrepos:Favorites')))) {
      return JSON.parse(localStorage.getItem(('@myrepos:Favorites'))).length
    } else {
      return 0
    }
  }

  render ()  {
    return(
      <Fragment>
        <NavStyle>
          <h3>Você tem {this.state.favoritesLenght} favoritos.</h3>
        </NavStyle>
        <Icons>
          <p><i className="fas fa-heart color"></i> Favorite</p>
          <p><i style={{color: "green"}} className="fa fa-hammer" /> Update</p>
          <p><i style={{color: "red"}} className="fa fa-bug" /> Delete</p>
          <p><i style={{color: "dodgerblue"}} className="fas fa-anchor" /> Link</p>
        </Icons>
      </Fragment>
    )

  }
}

export default Nav;
