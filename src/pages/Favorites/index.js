import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import moment from "moment";

import { Container, Favorite } from "./style";

moment.locale("pt-br");

class Favorites extends Component {
  state = {
    favorites: []
  };

  componentDidMount() {
    const repos = JSON.parse(localStorage.getItem("@myrepos:Favorites")) || [];
    this.setState({ favorites: repos });
  }

  handleDelete = name => {
    this.notifyDelete(name);
    const newRepos = this.state.favorites.filter(
      favorite => favorite.full_name !== name
    );

    this.setState({ favorites: newRepos }, () =>
      localStorage.setItem("@myrepos:Favorites", JSON.stringify(newRepos))
    );
  };

  handleUpdate = async id => {
    const [{ full_name }] = JSON.parse(
      localStorage.getItem("@myrepos:Favorites")
    ).filter(repo => repo.id === id);

    const [, name] = full_name.split("/");

    this.notifyUpdate(name);

    const { data: repository } = await api(`/repos/${full_name}`);

    this.setState(
      {
        favorites: this.state.favorites.map(repo =>
          repo.id === id ? repository : repo
        )
      },
      () =>
        localStorage.setItem(
          "@myrepos:Favorites",
          JSON.stringify(this.state.favorites)
        )
    );
  };

  notifyDelete = repo => toast.error(repo + " excluído com sucesso!");
  notifyUpdate = repo => toast.info(repo + " atualizado!");

  render() {
    const { favorites } = this.state;

    return (
      <Container>
        <ToastContainer />
        {favorites.map(favorite => (
          <Favorite key={favorite.id}>
            <header>
              <img src={favorite.owner.avatar_url} alt={favorite.name} />
              <strong>{favorite.name}</strong>
              <small>{favorite.full_name}</small>
            </header>

            <ul>
              <li>
                {favorite.stargazers_count} <small>stars</small>
              </li>
              <li>
                {favorite.forks} <small>forks</small>
              </li>
              <li>
                {favorite.open_issues_count} <small>issues</small>
              </li>
              <li>
                {moment(favorite.updated_at).fromNow()}{" "}
                <small>last commit</small>
              </li>
              <li>
                {favorite.language} <small>language</small>
              </li>
            </ul>
            <button
              title="Atualizar"
              className="update"
              onClick={() => this.handleUpdate(favorite.id)}
            >
              <i className="fa fa-hammer" />
            </button>
            <button
              title="Apagar"
              className="delete"
              onClick={() => this.handleDelete(favorite.full_name)}
            >
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addFavorite: repository =>
    dispatch({ type: "ADD_FAVORITE", payload: { repository } })
});

export default connect(mapDispatchToProps)(Favorites);
