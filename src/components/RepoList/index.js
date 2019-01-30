import React, {Component, Fragment } from 'react';
import moment from 'moment';

import { Container, Favorite } from './style';

moment.locale('pt-br');

export default class RepoList extends Component {

  state = {
    favorites: []
  }

  componentDidMount() {
    this.setState({favorites : JSON.parse(localStorage.getItem('@myrepos:Favorites')) || []})
  }

  saveRepo  = (name)  => {
    this.setState({ favorites: [...this.state.favorites, name] }, () => localStorage.setItem('@myrepos:Favorites', JSON.stringify(this.state.favorites) ))

  }

  render (){

    const { repos, user } = this.props;

    return (
      <Container>
        <header key={user.id} className="head">
          <img src={user.avatar_url } alt={user.name} />
          <strong>{user.login}</strong>
          <small>{user.html_url}</small>
        </header>
      <section>
      {repos.map(favorite => (
        <Favorite key={favorite.id}>
          <header>
            <strong>{favorite.name}</strong>
            <small>{favorite.full_name}</small>
          </header>

          <ul>
            {/* <li>{favorite.description} <small>description</small></li> */}
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
            title="Favoritas"
            onClick={() => this.saveRepo(favorite.full_name)}
          >
            <i style={{color:"red"}}className="fas fa-heart" />
          </button>
        </Favorite>
      ))}
      </section>
    </Container>
  )}
}

