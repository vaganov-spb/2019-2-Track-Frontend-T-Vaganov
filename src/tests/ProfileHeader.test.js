import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ProfileHeader from '../components/userpage/ProfileHeader';

const mockStore = configureStore();

describe('ProfileHeader renders and act correctly', () => {
	let store;
	let component;
	let originalLocalStorage;

	beforeAll(()=>{
		originalLocalStorage = window.localStorage;
		delete window.localStorage;
		Object.defineProperty(window, 'localStorage', {
			writable: true,
			value: {
				getItem: jest.fn().mockName('getItem'),
				setItem: jest.fn().mockName('setItem')
			}
		});
	});

	beforeEach(() => {
		localStorage.getItem.mockClear();
		localStorage.setItem.mockClear();

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
					<ProfileHeader/>
				</MemoryRouter>  
			</Provider>
		);
	});
    
	afterAll(()=>{
		Object.defineProperty(window, 'localStorage', {writable: true, value: originalLocalStorage});
	});

	it ('should render normally', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
 
	it ('should act normally', () => {
		const saveLS = component.root.findByProps({className: 'mark_img'});
		saveLS.props.onClick();
 
		expect(localStorage.setItem).toHaveBeenCalled();
		expect(localStorage.setItem).toHaveBeenCalledWith('profile', '{"Name":"Borat","Nick":"Sagdiev","Bio":"Pasha Technik"}');
	});
   
});
    


