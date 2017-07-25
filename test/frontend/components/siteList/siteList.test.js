import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import LoadingIndicator from '../../../../frontend/components/loadingIndicator';

proxyquire.noCallThru();

const SiteListItem = () => <div />;

const NO_SITE_TEXT = 'No sites yet.';

// sites can be empty as the test is rendering empty divs for children.
const STORE_WITH_SITES = { sites: { isLoading: false, data: [{}, {}, {}] } };
const STORE_WITH_NO_SITES = { sites: { isLoading: false, data: [] } };
const STORE_LOADING_SITES = { sites: { isLoading: true } };

describe('<SiteList />', () => {
  let SiteList;
  let wrapper;

  beforeEach(() => {
    SiteList = proxyquire('../../../../frontend/components/siteList/siteList', {
      './siteListItem': SiteListItem,
    }).SiteList;
  });

  describe('when sites are being loaded', () => {
    beforeEach(() => {
      wrapper = shallow(<SiteList storeState={STORE_LOADING_SITES} />);
    });

    it('renders a loading indicator', () => {
      expect(wrapper.find(LoadingIndicator)).to.have.length(1);
    });
  });

  describe('when no sites are received as props', () => {
    beforeEach(() => {
      wrapper = shallow(<SiteList storeState={STORE_WITH_NO_SITES} />);
    });

    it('renders an h1 element with the title', () => {
      expect(wrapper.find('div.header-title > h1')).to.have.length(1);
    });

    it('always renders 2 `add new site` button', () => {
      expect(wrapper.find('Link[to="/sites/new"]')).to.have.length(2);
    });

    it('renders fallback content when user has no sites', () => {
      const fallbackEl = wrapper.find('h1').filterWhere(el => el.text() === NO_SITE_TEXT);

      expect(fallbackEl.text()).to.equal(NO_SITE_TEXT);
    });
  });

  describe('when sites are received as props', () => {
    beforeEach(() => {
      wrapper = shallow(<SiteList storeState={STORE_WITH_SITES} />);
    });

    it('renders a container for the list of sites', () => {
      expect(wrapper.find('.sites-list')).to.have.length(1);
    });

    it('renders a SiteListItem component for each site in the list', () => {
      expect(wrapper.find(SiteListItem)).to.have.length(3);
    });
  });
});
