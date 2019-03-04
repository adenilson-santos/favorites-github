import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import moment from "moment";

import { Container, Favorite } from "./style";

moment.locale("pt-br");

class Favorites extends Component {
  componentDidMount() {
    const repos = this.props.favorites || [];
    this.setState({ favorites: repos });
  }

  handleDelete = async name => {
    this.notifyDelete(name);

    await this.props.rmFavorite(name);

    localStorage.setItem(
      "@myrepos:Favorites",
      JSON.stringify(this.props.favorites)
    );
  };

  handleUpdate = async id => {
    const [{ full_name }] = this.props.favorites.filter(repo => repo.id === id);

    const [, name] = full_name.split("/");

    this.notifyUpdate(full_name);

    const { data: repository } = await api(`/repos/${full_name}`);

    await this.props.upFavorite(id, repository);

    localStorage.setItem(
      "@myrepos:Favorites",
      JSON.stringify(this.props.favorites)
    );
  };

  notifyDelete = repo => toast.warn(repo + " excluído com sucesso!");
  notifyUpdate = repo => toast.info(repo + " atualizado!");

  render() {
    return (
      <Container>
        <ToastContainer />
        {this.props.favorites.map(favorite => (
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

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  rmFavorite: name => dispatch({ type: "RM_FAVORITE", payload: { name } }),
  upFavorite: (id, repository) =>
    dispatch({ type: "UP_FAVORITE", payload: { id, repository } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
