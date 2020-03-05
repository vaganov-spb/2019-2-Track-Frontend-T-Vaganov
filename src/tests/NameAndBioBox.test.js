import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import NameAndBioBox from '../components/userpage/NameAndBioBox';

const mockStore = configureStore();

describe('NameAndBioBox renders and act correctly', () => {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({
			userinfo: {
				info: {
					Name: 'Borat',
					Nick: 'Sagdiev',
					Bio: 'Pasha Technik'
				},
				isLoaded: true,
				error: null, 
			}
		});
        
		component = renderer.create(
			<Provider store={store}>
				<MemoryRouter>
					<NameAndBioBox/>
				</MemoryRouter>  
			</Provider>
		);
	});

	it ('should render normally', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
});