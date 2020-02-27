/* import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import ProfileHeader from '../components/userpage/ProfileHeader';
import configureStore from './store/index';

const store = configureStore();

export default {
    title: 'ProfileHeader',
    component: ProfileHeader,
  };

export const ProfileHeaderSimple = () => <ProfileHeader />;

ProfileHeaderSimple.story = {
    name: 'Simple ProfileHeader component',
};

export const ProfileHeaderOnClick = () => <ProfileHeader onClick={action('clicked!')}/>;

ProfileHeaderOnClick.story = {
    name: 'OnClick ProfileHeader component',
}; */