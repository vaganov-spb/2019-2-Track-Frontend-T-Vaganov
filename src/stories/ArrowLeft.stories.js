/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import '../styles/globalStyles.css';
import { ArrowLeft } from '../components/chatform/ArrowLeft';

export default {
	title: 'ArrowLeft',
	component: ArrowLeft,
};

const props = {
	children:
        <Link style={{color: 'var(--red)',}} to="/">
        	<i className="fa fa-arrow-left"/>
        </Link>,
};

export const ArrowLeftWithData = () => (
	<MemoryRouter>
		<ArrowLeft { ...props }/>
	</MemoryRouter>
);

ArrowLeftWithData.story = {
	name: 'ArrowLeft with props',
};