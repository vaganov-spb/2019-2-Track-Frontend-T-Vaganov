import React from 'react';
import { action } from '@storybook/addon-actions';
import '../styles/globalStyles.css';
import { HeaderTop } from '../components/chatslist/HeaderTop';

export default {
	title: 'HeaderTop',
	component: HeaderTop,
};

export const HeaderTopSimple = () => <HeaderTop />;

HeaderTopSimple.story = {
	name: 'HeaderTop without props',
};