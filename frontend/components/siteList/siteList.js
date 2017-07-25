import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AlertBanner from '../alertBanner';
import SiteListItem from './siteListItem';
import LoadingIndicator from '../loadingIndicator';

const propTypes = {
  storeState: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.array,
  }),
};

const defaultProps = {
  storeState: null,
};

const getSites = (sitesState) => {
  if (sitesState.isLoading) {
    return <LoadingIndicator />;
  }

  if (!sitesState.data || !sitesState.data.length) {
    return (
      <div className="usa-grid">
        <h1>No sites yet.</h1>
        <p>Add one now.</p>
      </div>
    );
  }

  return (
    <div className="usa-grid">
      <h2>Websites</h2>
      <ul className="sites-list">
        {sitesState.data.map(site => (<SiteListItem key={site.id} site={site} />))}
      </ul>
    </div>
  );
};

const addWebsiteButton = () => (
  <Link
    to="/sites/new"
    role="button"
    className="usa-button usa-button-big pull-right icon icon-new icon-white"
    alt="Add a new website"
  >
    Add Website
  </Link>
);

const SiteList = ({ storeState }) =>
  (<div>
    <div className="usa-grid dashboard header">
      <div className="usa-width-two-thirds">
        <img className="header-icon" src="/images/websites.svg" alt="Websites icon" />
        <div className="header-title">
          <h1>Your Websites</h1>
          <p>Dashboard</p>
        </div>
      </div>
      <div className="usa-width-one-third">
        {addWebsiteButton()}
      </div>
    </div>
    <AlertBanner {...storeState.alert} />
    {getSites(storeState.sites)}
    <div className="usa-grid">
      <div className="usa-width-one-whole">
        {addWebsiteButton()}
      </div>
    </div>
  </div>);

SiteList.propTypes = propTypes;
SiteList.defaultProps = defaultProps;

export default connect(state => state)(SiteList);
