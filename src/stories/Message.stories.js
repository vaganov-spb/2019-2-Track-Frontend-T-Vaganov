import React from 'react';
import { action } from '@storybook/addon-actions';
import '../styles/globalStyles.css';
import { Message } from '../components/chatform/Messages';

export default {
	title: 'Message',
	component: Message,
};

export const ProfileHeaderSimple = () => <Message />;

ProfileHeaderSimple.story = {
	name: 'Message without props',
};