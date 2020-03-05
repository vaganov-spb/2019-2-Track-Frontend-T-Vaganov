import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import '../styles/globalStyles.css';
import { HeaderChatList } from '../components/chatslist/HeaderChatList';

export default {
	title: 'HeaderChatList',
	component: HeaderChatList,
};

export const HeaderChatListSimple = () => (
	<MemoryRouter>
		<HeaderChatList/>
	</MemoryRouter>
);

HeaderChatListSimple.story = {
	name: 'HeaderChatList without props',
};