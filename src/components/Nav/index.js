import React, { Fragment, Component } from 'react';

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
        <header>
          <span>{this.state.favoritesLenght}</span>
        </header>
      </Fragment>

    )

  }
}

export default Nav;
