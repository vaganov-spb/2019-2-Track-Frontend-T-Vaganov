/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ArrowLeft } from '../components/chatform/ArrowLeft';

describe('ArrowLeft renders and act correctly', () => {
	let props;
	let component;

	beforeEach(() => {
		props = {
			children: <p> Test </p>
		};
        
		component = renderer
			.create(
				<MemoryRouter>
					<ArrowLeft { ...props } />
				</MemoryRouter>  
			)
			.toJSON();
         
	});

	it ('should render normally', () => {
		expect(component).toMatchSnapshot();
	});
});
