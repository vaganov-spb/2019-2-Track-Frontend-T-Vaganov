/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';  
import renderer from 'react-test-renderer'; 
import { Message } from '../components/chatform/Message';  


describe('Message renders and act correctly', () => {
	let props;
	let component;

	beforeEach(() => {
		props = {
			text: 'test_text',
			Date: 'test_Date',
			user: 'test_user',
		};
        
		component = renderer
			.create(
				<Message { ...props } />
			)
			.toJSON();
         
	});

	it ('should render normally', () => {
		expect(component).toMatchSnapshot();
	});
});