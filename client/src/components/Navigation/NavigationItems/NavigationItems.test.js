import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

  describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<NavigationItems />);
    });

    it('should render three <NavigationItem /> elements if not authenticated', () => {
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render five <NavigationItem /> elements if authenticated', () => {
      wrapper.setProps({ isAuthenticated: true });
      expect(wrapper.find(NavigationItem)).toHaveLength(5);
    });

    it('should render six <NavigationItem /> elements if authenticated', () => {
      wrapper.setProps({ isAuthenticated: true, isPt: true });
      expect(wrapper.find(NavigationItem)).toHaveLength(6);
    });

    it('should render seven <NavigationItem /> elements if authenticated', () => {
      wrapper.setProps({ isAuthenticated: true, isPt: true, isAdmin: true });
      expect(wrapper.find(NavigationItem)).toHaveLength(7);
    });

    it('Logout should render if you are authenticated', () => {
      wrapper.setProps({ isAuthenticated: true });
      expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});
