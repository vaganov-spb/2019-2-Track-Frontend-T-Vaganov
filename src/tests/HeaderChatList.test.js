import React from 'react';  
import renderer from 'react-test-renderer'; 
import { MemoryRouter } from 'react-router-dom';
import { HeaderChatList } from '../components/chatslist/HeaderChatList';  


it('HeaderChatList renders correctly', () => {
	const tree = renderer
		.create(
			<MemoryRouter>
				<HeaderChatList/>
			</MemoryRouter> 
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});