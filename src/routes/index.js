/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Router , Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from '@emotion/styled';
import Chat from '../pages/Chat';
import ChatList from '../pages/ChatList';
import { Fill } from '../utils/LocalStorageFill';
import Profile from '../pages/Profile';

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
						<Redirect from='*' to='/' />
					</Switch>
				</Container>
			</Router>
		);
	}
}

export default Routes;
