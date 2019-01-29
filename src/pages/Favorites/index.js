import React, { Fragment, Component} from 'react';

import api from '../../services/api';
import moment from 'moment';

import { Container, Favorite } from './style';

moment.locale('pt-br');

export default class Favorites extends Component {

  state = {
    favorites: []
  }

  componentDidMount () {

    return JSON.parse(localStorage.getItem('@myrepos:Favorites')) ? JSON.parse(localStorage.getItem('@myrepos:Favorites')).map( async name =>{
      const {data:newFavorite} = await api.get(`/repos/${name}`)
      this.setState({favorites: [...this.state.favorites, newFavorite]})
    }) : []

  }

  render(){

    const { favorites } = this.state;

    return (
      <Container>
        {favorites.map(favorite => (
          <Favorite key={favorite.id}>
            <header>
              <img src={favorite.owner.avatar_url} alt={favorite.name} />
              <strong>{favorite.name}</strong>
              <small>{favorite.full_name}</small>
            </header>

            <ul>
              <li>
                {favorite.stargazers_count}
                {' '}
                <small>stars</small>
              </li>
              <li>
                {favorite.forks}
                {' '}
                <small>forks</small>
              </li>
              <li>
                {favorite.open_issues_count}
                {' '}
                <small>issues</small>
              </li>
              <li>
                {moment(favorite.updated_at).fromNow()}
                {' '}
                <small>last commit</small>
              </li>
              <li>
                {favorite.language}
                {' '}
                <small>language</small>
              </li>
            </ul>
            <button
              title="Atualizar"
              className="update"
            >
              <i className="fa fa-hammer" />
            </button>
            <button title="Apagar"  className="delete">
              <i className="fa fa-bug" />
            </button>
            <a
              title="Acessar"
              href={favorite.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              <i className="fas fa-anchor" />
            </a>
          </Favorite>
        ))}
      </Container>
    )
  }

}
