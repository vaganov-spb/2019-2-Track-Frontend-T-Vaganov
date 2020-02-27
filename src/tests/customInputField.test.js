/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Input from '../components/chatform/customInputField';

const mockStore = configureStore();

describe('customInputFields renders and act correctly', () => {
	let store;
	let component;
	let props;

	beforeEach(() => {
		props = {
			chatId: 1,
		};

		store = mockStore({
			currentInputText: {
				1: {
					text: 'test_text',
					flag: 'true',
				}
			},
		});
		store.dispatch = jest.fn();
		component = renderer.create(
			<Provider store={store}>
				<MemoryRouter>
					<Input { ...props }/>
				</MemoryRouter>  
			</Provider>
		);
	});

	it ('should render normally', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
   
	it ('should work correctly onChange 1', () => {
		const value = component.root.findByProps({className: 'form'});
		const event = {
			preventDefault() {},
			target: { value: '' }
		};

		value.props.onChange(event);
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith({'chat': 1, 'type': 'CLEAR_INPUT_VAL'});
	});

	it ('should work correctly onChange 2', () => {
		const value = component.root.findByProps({className: 'form'});
		const event = {
			preventDefault() {},
			target: { value: 'test_text' }
		};

		value.props.onChange(event);
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith({'chat': 1, 'type': 'CHANGE_INPUT_VAL', 'payload': 'test_text'});
	});
    
	it ('should work correctly onKeyPress 1', () => {
		const value = component.root.findByProps({className: 'form'});
		const event = {
			preventDefault() {},
			key: 'Enter',
		};

		value.props.onKeyPress(event);
		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenNthCalledWith(1, {
			'chat': 1,
			'payload': [
				{
					'message': 'test_text',
					'time': expect.anything(),
					'type': 'text',
				},
			],
			'type': 'LOAD_MESSAGES_SUCCESS',
		}); 
		expect(store.dispatch).toHaveBeenNthCalledWith(2, { 'chat': 1, 'type': 'CLEAR_INPUT_VAL' });
	});
});