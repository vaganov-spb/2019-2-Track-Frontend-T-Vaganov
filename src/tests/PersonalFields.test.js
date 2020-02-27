/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import PersonalFields from '../components/userpage/UserInfoFields';

const mockStore = configureStore();

describe('PersonalFields renders and act correctly', () => {
	let store;
	let component;
	let props;

	beforeEach(() => {
		props = {
			name: 'Name',
			placeholder: '',
			maxlen: 5,
			row: 1,
			description: '',
		};

		store = mockStore({
			userinfo: {
				info: {
					Name: 'Borat',
					Nick: 'Sagdiev',
					Bio: 'Pasha Technik'
				},
				isLoaded: true,
				error: null, 
			},
		});
        
		store.dispatch = jest.fn();

		component = renderer.create(
			<Provider store={store}>
				<MemoryRouter>
					<PersonalFields { ...props }/>
				</MemoryRouter>  
			</Provider>
		);
	});

	it ('should render normally', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
   
	it ('should work correctly onChange', () => {
		const value = component.root.findByProps({className: 'name'});
		const event = {
			preventDefault() {},
			target: { value: '' }
		};

		value.props.onChange(event);
		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});
});