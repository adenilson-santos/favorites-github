import React, { Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import RepoList from '../../components/RepoList';

import { Container } from './style';

export default class Main extends React.Component {

  state = {
    inputUser: '',
    error: false,
    errorStyle:false,
    repositories: [],
    user: null,
    reposLenght: 0,
    loading: false
  }

  // usar depois
  notify = () => toast("Wow so easy !");

  handleUser = async (e) => {
    e.preventDefault();
    this.setState({error: false, loading: true})

    const { inputUser } = this.state;

    try {
      const { data:repos } = await api(`/users/${inputUser}/repos`);
      const { data:user } = await api(`/users/${inputUser}`);

      this.setState({ repositories: repos ? repos : [], user: user})

      // console.log(repos)
      // repos.map(res => console.log(res))
    } catch (err) {
      if( err.response && err.response.status === 404 ) return this.setState({error: 'Usuário não existe.', errorStyle:true});

      return this.setState({ error: err.message, errorStyle:true})
    } finally {
      this.setState({loading: false})
    }
  }

  render() {

    const { inputUser, user, error, repositories, loading } = this.state;

    return (
      <Fragment>
        <Container>
          <ToastContainer />
          <form onSubmit={this.handleUser}>
            <input onChange={e => this.setState({inputUser: e.target.value})} value={inputUser} palceholder="Type a name user." type="text"/>
            <button type='submit'> {loading ? <i className="fa fa-spinner fa-pulse" /> : <i className="fa fa-angle-double-right"></i>} </button>
          </form>
          {error ? <span>{error}</span> : null}
        </Container>
        <RepoList repos={repositories} user={user} />
      </Fragment>
    )
  }

}
