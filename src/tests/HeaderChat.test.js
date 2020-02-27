/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import HeaderChat from '../components/chatform/ChatHeaderInfo';

const mockStore = configureStore();

describe('HeaderChat renders and act correctly', () => {
	let props;
    let component;
    let store;

	beforeEach(() => {
		props = {
			chatId: 1,
        };
        
        store = mockStore({
				chats: {
					chats: {
                        1: {
                            name: 'test_name',
                            flag: true,
                            url: 'test_url',
                        }
                    },
                    error: null,
                    isLoaded: true,
				}
			});
        
		component = renderer
			.create(
                <Provider store={store}>
                    <MemoryRouter>
                        <HeaderChat { ...props } />
                    </MemoryRouter>  
                </Provider>
			)
			.toJSON();
         
	});

	it ('should render normally', () => {
		expect(component).toMatchSnapshot();
	});
});