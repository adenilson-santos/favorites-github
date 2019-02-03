import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Favorite } from "./style";

moment.locale("pt-br");

class RepoList extends Component {
  state = {
    favorites: []
    // myFavorites: JSON.parse(localStorage.getItem('@myrepos:Favorites'))
  };

  notifyFavorite = repository =>
    toast.success(`${repository} adicionado aos seus favoritos.`);

  componentDidMount() {
    this.setState({
      favorites: JSON.parse(localStorage.getItem("@myrepos:Favorites")) || []
    });
  }

  saveRepo = async repository => {
    const [, newName] = repository.full_name.split("/");
    this.notifyFavorite(newName);

    await this.props.addFavorite(repository);

    localStorage.setItem(
      "@myrepos:Favorites",
      JSON.stringify(this.props.favorites)
    );
  };

  render() {
    const { repos, user } = this.props;

    return user ? (
      <Container>
        <ToastContainer />
        <section>
          <header key={user.id} className="head">
            <aside>
              <img src={user.avatar_url} alt={user.name} />
              <div>
                <strong>{user.login}</strong>
                <small>{user.html_url}</small>
                {user.following || user.followers ? (
                <div>
                  <p>
                    <small>Following {user.following}</small>{" "}
                    <small>Followers {user.followers}</small>{" "}
                  </p>
                </div>

                ) : null}
              </div>
            </aside>
          </header>
          {user.company || user.location || user.blog ? (
            <header className="head">
              <aside>
                <div>
                  {user.company ? (
                    <span>
                      <p>
                        <i className="fas fa-building" />
                      </p>
                      <small>{user.company}</small>
                    </span>
                  ) : null}

                  {user.location ? (
                    <span>
                      <p>
                        <i className="fas fa-map-marked" />
                      </p>
                      <small>{user.location}</small>
                    </span>
                  ) : null}
                  {user.blog ? (
                    <span>
                      <p>
                        <i className="fas fa-blog" />
                      </p>
                      <small>{user.blog}</small>
                    </span>
                  ) : null}
                </div>
              </aside>
            </header>
          ) : null}
          {user.bio ? (
            <header className="head">
              <aside>
                <div>
                  <small>{user.bio}</small>
                </div>
              </aside>
            </header>
          ) : null}
        </section>
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
              <button title="Favoritas" onClick={() => this.saveRepo(favorite)}>
                <i style={{ color: "#666" }} className="fas fa-heart" />
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
      </Container>
      
    ) : null;
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  addFavorite: repository =>
    dispatch({ type: "ADD_FAVORITE", payload: { repository } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoList);
