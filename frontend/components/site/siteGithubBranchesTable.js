import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../loadingIndicator';

const tableHeader = () => (
  <thead>
    <tr>
      <th>Branch</th>
      <th />
    </tr>
  </thead>
);

const previewURL = (branch, site) => {
  if (branch.name === site.defaultBranch) {
    return site.viewLink;
  } else if (branch.name === site.demoBranch) {
    return site.demoViewLink;
  }
  return `/preview/${site.owner}/${site.repository}/${branch.name}/`;
};

const branchRow = (branch, site) => (
  <tr key={branch.name}>
    <td>{branch.name}</td>
    <td>
      <a href={previewURL(branch, site)} target="_blank" rel="noopener noreferrer">View</a>
    </td>
  </tr>
);

const tableBody = (site, branches) => (
  <tbody>
    {branches.data.map(branch => branchRow(branch, site))}
  </tbody>
);


const renderTable = (site, branches) => (
  <table className="usa-table-borderless">
    {tableHeader()}
    {tableBody(site, branches)}
  </table>
);

const renderLoadingState = () => <LoadingIndicator />;

const renderErrorState = () => (
  <p>
    An error occured while downloading branch data from Github.
    Often this is because the repo is private or has been deleted.
  </p>
);

const SiteGithubBranchesTable = ({ site, branches }) => {
  if (branches.isLoading) {
    return renderLoadingState();
  } else if (branches.error || !branches.data || branches.data.length === 0) {
    return renderErrorState();
  }
  return renderTable(site, branches);
};


SiteGithubBranchesTable.propTypes = {
  site: PropTypes.shape({
    defaultBranch: PropTypes.string.isRequired,
    viewLink: PropTypes.string.isRequired,
    demoViewLink: PropTypes.string,
    owner: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
  }).isRequired,
  branches: PropTypes.shape({
    error: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array,
  }).isRequired,
};

export default SiteGithubBranchesTable;
