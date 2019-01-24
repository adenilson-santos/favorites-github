import React, { Fragment } from 'react';

import api from '../../services/api';

import RepoList from '../../components/RepoList';

export default class Main extends React.Component {

  state = {
    inputUser: '',
    error: null,
    repositories: [],
    user: {}
  }

  handleUser = async (e) => {
    e.preventDefault();

    const { inputUser } = this.state;
    this.setState({error: null})

    try {
      const { data:repos } = await api(`/users/${inputUser}/repos`);

      this.setState({ repositories: repos, user:repos[0].owner})

      console.log(repos)
      // repos.map(res => console.log(res))
    } catch (err) {
      if( err.response && err.response.status === 404 ) return this.setState({error: 'Usuário não existe.'});

      console.log(err.response.status)
      return this.setState({ error: err.message})
    } finally {
    }
  }

  render() {

    const { inputUser, user, error, repositories } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleUser}>
          <input onChange={e => this.setState({inputUser: e.target.value})} value={inputUser}/>
          <button type='submit'> >> </button>
        </form>
        {error ? <span>{error}</span> : null}
        <RepoList repos={repositories} user={user} />
      </Fragment>
    )
  }

}
