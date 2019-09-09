/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './styles';

const CompareList = ({ repositories = [] }) => (
  <Container>
    {repositories.map((repository) => {
      const {
        id,
        name,
        stargazers_count,
        forks_count,
        open_issues_count,
        last_commit,
        owner: { login, avatar_url } = {},
      } = repository;
      return (
        <Repository key={id}>
          <header>
            <img src={avatar_url} alt="logo" />
            <strong>{name}</strong>
            <small>{login}</small>
          </header>
          <ul>
            <li>
              {stargazers_count} <small>stars</small>
            </li>
            <li>
              {forks_count} <small>forks</small>
            </li>
            <li>
              {open_issues_count} <small>issues</small>
            </li>
            <li>
              {last_commit} <small>last commit</small>
            </li>
          </ul>
        </Repository>
      );
    })}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
      last_commit: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default CompareList;
