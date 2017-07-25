import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
import proxyquire from 'proxyquire';

proxyquire.noCallThru();

const alertActionUpdate = stub();
const Header = () => <div />;

const username = 'jenny mcuser';

const props = {
  alert: {},
  user: {
    data: {
      username,
    },
    isLoading: false,
  },
  location: {
    key: 'a-route',
  },
};

const AppFixture = proxyquire('../../../frontend/components/app', {
  '../store': {},
  '../actions/alertActions': { update: alertActionUpdate },
  './header': Header,
}).App;

describe('<App/>', () => {
  let wrapper;

  beforeEach(() => {
    // TODO: need to figure out the store mocking here and refactor these
    wrapper = shallow(<AppFixture {...props} />);
    alertActionUpdate.reset();
  });

  it('renders its header component', () => {
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('delivers the correct props to the header', () => {
    const expectedProps = {
      username,
    };
    const actualProps = wrapper.find(Header).props();

    expect(actualProps).to.deep.equal(expectedProps);
  });

  it('does not trigger an alert update if no alert message is present', () => {
    wrapper.setProps({ location: { key: 'path' } });
    expect(alertActionUpdate.called).to.be.false;
  });

  it('does not trigger an alert update if the route has not changed', () => {
    const newProps = Object.assign({}, props, {
      alert: {
        message: 'hello!',
        stale: false,
      },
    });

    wrapper = shallow(<AppFixture {...newProps} />);
    wrapper.setProps({ location: { key: 'a-route' } });
    expect(alertActionUpdate.called).to.be.false;
  });

  it('triggers an alert update if there is an alert message', () => {
    const newProps = Object.assign({}, props, {
      alert: {
        message: 'hello!',
        stale: false,
      },
    });

    wrapper = shallow(<AppFixture {...newProps} />);

    wrapper.setProps({ location: { key: 'next-route' } });
    expect(alertActionUpdate.called).to.be.true;
    expect(alertActionUpdate.calledWith(newProps.alert.stale)).to.be.true;
  });
});
