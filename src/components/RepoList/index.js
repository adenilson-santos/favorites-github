import React, {Component } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, Favorite } from './style';

moment.locale('pt-br');

export default class RepoList extends Component {

  state = {
    favorites: [],
    // myFavorites: JSON.parse(localStorage.getItem('@myrepos:Favorites'))
  }

  notifyFavorite = (repository) => toast.success(`${repository} adicionado aos seus favoritos.`)

  componentDidMount() {
    this.setState({favorites : JSON.parse(localStorage.getItem('@myrepos:Favorites')) || []})
  }

  saveRepo  = (name)  => {
    this.setState({ favorites: [...this.state.favorites, name] }, () => localStorage.setItem('@myrepos:Favorites', JSON.stringify(this.state.favorites) ))
    console.log(name);

    const [, newName] = name.split('/');
    this.notifyFavorite(newName);
  }

  render (){

    const { repos, user } = this.props;

    return (
      user ?
      <Container>
        <ToastContainer/>
        <header key={user.id} className="head">
          <img src={user.avatar_url } alt={user.name} />
          <div>
            <strong>{user.login}</strong>
            <small>{user.html_url}</small>
          </div>
          {/* <div className="user_info">
            <p>
              {user.blog} <small>blog</small>
            </p>
            <p>
              {user.company} <small>company</small>
            </p>
          </div> */}
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
          <i style={{color:"#666"}}className="fas fa-heart" />
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
      </section>
    </Container> : null
  )}
}

