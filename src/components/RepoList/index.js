import React, {Component, Fragment } from 'react';

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

    return (<Fragment>
      <div>
        <header key={user.id}>
          <img src={user.avatar_url } alt={user.name} />
          <strong>{user.login}</strong>
          <small>{user.html_url}</small>
        </header>
        {repos.map(repo => (
          <div key={repo.id} >
            <ul>
              <li>{repo.name}</li>
              <li>{repo.full_name}</li>
            </ul>
            <button onClick={() => this.saveRepo(repo.full_name)}><i className="fas fa-heart"></i></button>
          </div>
        ))}
      </div>
    </Fragment>
  )}
}

