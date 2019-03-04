import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";

import RepoList from "../../components/RepoList";

import { Container } from "./style";
import "./style.css";

export default class Main extends React.Component {
  state = {
    inputUser: "",
    lastInputUser: "",
    error: false,
    errorStyle: false,
    repositories: [],
    user: null,
    reposLenght: 0,
    loading: false,
    pageCount: 0,
    currentPage: 1,
  };

  // usar depois
  notify = (qntOfRepos, username) =>
    toast(
      " Foram encontrados " +
        qntOfRepos +
        " repositórios públicos de " +
        username +
        " !"
    );

  handleUser = async e => {
    e.preventDefault();
    this.setState({ error: false, loading: true });

    const { inputUser } = this.state;

    try {
      const { data: repos } = await api(`/users/${inputUser}/repos`);
      const { data: user } = await api(`/users/${inputUser}`);

      this.notify(user.public_repos, user.name);
      this.setState({
        repositories: repos ? repos : [],
        user: user,
        pageCount: user.public_repos / 30
      });

      // console.log(repos)
      // repos.map(res => console.log(res))
    } catch (err) {
      if (err.response && err.response.status === 404)
        return this.setState({
          error: "User not found.",
          errorStyle: true
        });

      return this.setState({ error: err.message, errorStyle: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handlePageClick = async data => {
    const { lastInputUser } = this.state;

    let selected = data.selected + 1;

    const { data: repos } = await api(
      `/users/${lastInputUser}/repos?page=${selected}`
    );
    const { data: user } = await api(`/users/${lastInputUser}`);

    console.log("page: ", selected);

    this.setState({
      repositories: repos ? repos : [],
      user: user,
      pageCount: user.public_repos / 30
    });
  };

  render() {
    const { inputUser, user, error, repositories, loading } = this.state;

    return (
      <Fragment>
        <Container inputError={error}>
          <ToastContainer />
          <form onSubmit={this.handleUser}>
            <input
              onChange={e =>
                this.setState({
                  inputUser: e.target.value.trim(),
                  lastInputUser: e.target.value.trim()
                })
              }
              value={inputUser}
              placeholder="Type a name of user."
              type="text"
            />{" "}
            {loading ? (
              <button disabled>
                <i className="fa fa-spinner fa-pulse" />
              </button>
            ) : (
              <button type="submit">
                <i className="fa fa-angle-double-right" />
              </button>
            )}{" "}
          </form>
          <span>{error ? error : null}</span>
        </Container>
        <RepoList repos={repositories} user={user} />
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Fragment>
    );
  }
}
