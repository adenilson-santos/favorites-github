import React, { Fragment, Component} from 'react';

import api from '../../services/api';

export default class Favorites extends Component {

  state = {
    favorites: []
  }

  componentDidMount () {

    JSON.parse(localStorage.getItem('@myrepos:Favorites')).map( async name =>{
      const {data:newFavorite} = await api.get(`/repos/${name}`)
      console.log(newFavorite)
      this.setState({favorites: [...this.state.favorites, newFavorite]})
    })

  }



  render(){

    const { favorites } = this.state;

    return (
      <Fragment>
        {favorites.map(favorite => (
            <span>{favorite.name}</span>
        ))}
      </Fragment>
    )
  }

}
