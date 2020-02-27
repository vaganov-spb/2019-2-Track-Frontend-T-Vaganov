import React from 'react';  
import renderer from 'react-test-renderer'; 
import { HeaderTop } from '../components/chatslist/HeaderTop';  


it('HeaderTop renders correctly', () => {
	const tree = renderer
		.create(<HeaderTop/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});