export default (repositoryName = '') => fetch(`https://api.github.com/repos/${repositoryName}`);
