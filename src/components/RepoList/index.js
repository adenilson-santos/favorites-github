import React, { Fragment } from 'react';

const RepoList = ({repos, user}) => (
  <Fragment>
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
          <button><i className="fas fa-heart"></i></button>
        </div>
      ))}
    </div>
  </Fragment>
)

export default RepoList;
