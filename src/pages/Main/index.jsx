import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import getGitHubRepository from '../../services/gitHubApi';
import { Container, Form } from './styles';
import Logo from '../../assets/img/logo.png';
import CompareList from '../../components/CompareList/index';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      repositoryInput: '',
      repositories: [],
      repositoryError: false,
    };
  }

  bindRepositoryInput = ({ target: { value } }) => {
    this.setState({ repositoryInput: value });
  };

  getDataFormatada = (date = '') => moment(date)
      .locale('pt-br')
      .fromNow();

  addRepository = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { repositoryInput = '' } = this.state;
    const response = await getGitHubRepository(repositoryInput);
    if (response.status === 200) {
      const repository = await response.json();
      repository.last_commit = this.getDataFormatada(repository.pushed_at);
      const { repositories } = this.state;
      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: [...repositories, repository],
      });
    } else {
      this.setState({ repositoryError: true });
    }
    this.setState({ loading: false });
  };

  render() {
    const { repositories, repositoryInput } = this.state;
    const { repositoryError, loading } = this.state;
    return (
      <Container>
        <img src={Logo} alt="logo site" />
        <Form withError={repositoryError} onSubmit={this.addRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={this.bindRepositoryInput}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
