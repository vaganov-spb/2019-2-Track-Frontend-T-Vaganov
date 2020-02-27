/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ChatPreview } from '../components/chatslist/ChatPreview';

describe('ChatPreview renders and act correctly', () => {
	let props;
	let component;

	beforeEach(() => {
		props = {
			chat_id: 1,
			chat: {
				name: 'test_name',
				flag: true,
				url: 'test_url',
				lastMes: {
					message: 'test_message',
					time: 'test_time',
					type: 'test',
				}
			}
		};
        
		component = renderer
			.create(
				<MemoryRouter>
					<ChatPreview { ...props } />
				</MemoryRouter>  
			)
			.toJSON();
         
	});

	it ('should render normally', () => {
		expect(component).toMatchSnapshot();
	});
});
