/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Router , Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from '@emotion/styled';
import { Chat } from '../components/MessageForm';
import { ChatList } from '../components/ChatList';
import { Fill } from '../components/LocalStorageFill';
import { Profile } from '../components/Profile';
// import CounterContainer from '../containers/CounterContainer';
// import Header from '../components/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  height: auto;
  width: 384px;
  position: relative;
`;
export const history = createBrowserHistory();
Fill();

class Routes extends Component {

	render() {
		return (
			<Router history={history}>
				<Container>
					<Switch>
						<Route exact path='/' component={ChatList} />
						<Route path='/chat/' component={Chat} />
						<Route path='/profile/' component={Profile} />
					</Switch>
				</Container>
			</Router>
			
		);
	}
}

export default Routes;
