import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from '@emotion/styled'
import { Chat } from '../components/MessageForm'
import { ChatList } from '../components/ChatList'
import { Fill } from '../components/LocalStorageFill'
// import CounterContainer from '../containers/CounterContainer';
// import { Route, Switch } from 'react-router-dom';
// import Header from '../components/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  height: auto;
  width: 384px;
  position: relative;
`
export const history = createBrowserHistory()
Fill()

class Routes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      component: null,
    }
  }

  componentWillMount() {
    this.setState({ component: <ChatList renderChat={(chatId) => this.renderChat(chatId)} /> })
  }

  renderChat(chatId) {
    this.setState({ component: <Chat chatId={chatId} renderChatList={() => this.renderChatList()} /> })
    const obj = JSON.parse(localStorage.getItem(chatId))
    obj.flag = true
    localStorage.setItem(chatId, JSON.stringify(obj))
  }

  renderChatList() {
    this.setState({ component: <ChatList renderChat={(chatId) => this.renderChat(chatId)} /> })
  }

  render() {
    const { component } = this.state

    return (
      <Router history={history}>
        <Container>{component}</Container>
      </Router>
    )
  }
}

export default Routes
