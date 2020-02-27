import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Info from '../components/userpage/Info';

const mockStore = configureStore();

describe('Info renders and act correctly', () => {
	let store;
	let component;
	let elem;

	beforeEach(() => {
		store = mockStore({
			userinfo: {
				info: {
					Name: 'Borat',
					Nick: 'Sagdiev',
					Bio: 'Pasha Technik',
					src: 'img'
				},
				isLoaded: true,
				error: null, 
			}
		});
        
		component = renderer.create(
			<Provider store={store}>
				<MemoryRouter>
					<Info/>
				</MemoryRouter>  
			</Provider>
		);
         
		elem = component.root;
	});

	it ('should render normally', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('should have right src', () => {
		const img = elem.findByProps({className: 'img_content'});
		expect(img.props.src).toBe('img');
	});
});