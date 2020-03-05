/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import '../styles/globalStyles.css';
import { ChatPreview } from '../components/chatslist/ChatPreview';

export default {
	title: 'ChatPreview',
	component: ChatPreview,
};

const props = {
	chat_id: 95,
	chat: {
		url: 'https://static.mk.ru/upload/objects/articles/detailPicture/2c/1e/e1/9c0147769_4202820.jpg',
		name: 'Ramzan Kadyrov',
		lastMes: {
			message: 'Мой идол - Владимир Путин.Я люблю его так сильно как только мужчина может любить мужчину',
			time: '95-95'
		},
		flag: true,
	}
};

export const ChatPreviewWithData = () => (
	<MemoryRouter>
		<ChatPreview { ...props }/>
	</MemoryRouter>
);

ChatPreviewWithData.story = {
	name: 'ChatPreview with props',
};