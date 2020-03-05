/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import '../styles/globalStyles.css';
import { Message } from '../components/chatform/Message';

export default {
	title: 'Message',
	component: Message,
};

export const MessageSimple = () => <Message />;

MessageSimple.story = {
	name: 'Message without props',
};

const props = {
	Date: '12:12',
	user: 'test_user',
	text: 'test_text',
};

export const MessageWithData = () => <Message { ...props }/>;

MessageWithData.story = {
	name: 'Message with props',
};