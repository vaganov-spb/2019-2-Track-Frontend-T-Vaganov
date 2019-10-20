import { Fill } from './localStorageFill';

const template = document.createElement('template');
template.innerHTML = `
<style>
  .mess-header{
    height:67px;
    border: 1px solid #8E24AA;
    background-color: #8E24AA;
    display:flex;
    flex-direction:column;
  }

  .icons{
    height:17px;
    width: 100%;
  }

  .mes-list-bottom{
    height:50px;
  }

  .top-icons {
    float:right;
    width: 20%;
    height:100%;
  }

  .place-top-icons {
    width:100%;
    height:100%;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .list {
    border: 1px solid grey;
    border-top: none;
    padding-bottom: 1%;
    height:438px;
    display:flex;
    flex-direction: column;
    padding-left:3%;
    overflow-y: auto;
  }

  .mes-list-bottom {
    display:flex;
    flex-direction:row;
  }

  .burger {
    width:18%;
  }

  .written {
    width:64%;
    padding-top:3.5%;
    padding-left:4%;
  }

  .search-engine {
    width:18%;
  }

  .burg-icon{
    width = 10%;
    height:100%
    margin-left:10%;
    margin-top:3%;
  }

  .br {
    margin-left:15%;
    width:60%;
    filter: invert(200%);
  }

  .Message {
    color:white;
    font-size:21px;  
  }
  
  .search-icon{
    padding-top:16%;
    padding-left:30%;
  }

  .new-chat {
    position:absolute;
    right:10px;
    bottom:10px;
    height:70px;
    width:70px;
    border-radius:50%;
  }

  .Cr-chat {
    border-radius:50%;
    width:100%;
    cursor:pointer;
  }

</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="mess-header">
    <div class="icons">
        <div class="top-icons">
            <div class="place-top-icons">
              <span style="font-size: 15px; color: #DDA0DD;">
                  <i class="fa fa-circle"></i>
              </span>
              <span style="font-size: 15px; color: #DDA0DD;">
                  <i class="fa fa-battery-three-quarters"></i>
              </span>
              <span style="font-size: 15px; color:#DDA0DD;">
                  <i class="fa fa-apple"></i>
              </span>
            </div>
        </div>
    </div>
    <div class="mes-list-bottom">
        <div class="burger">
            <div class="burg-icon">
              <img class="br" src = 'https://static.thenounproject.com/png/696519-200.png'>
            </div>
        </div>
        <div class="written">
            <span class="Message">Messenger</span>
        </div>
        <div class="search-engine">
            <div class="search-icon">
                  <span style="font-size: 22px; color: white;">
                      <i class="fa fa-search"></i>
                  </span>
            </div>
        </div>
    </div>
</div>
<div class="list">
    <chat-preview chat-id="1"></chat-preview>
    <chat-preview chat-id="2"></chat-preview>
    <chat-preview chat-id="3"></chat-preview>
    <chat-preview chat-id="4"></chat-preview>
    <chat-preview chat-id="5"></chat-preview>
    <chat-preview chat-id="6"></chat-preview>
    <chat-preview chat-id="7"></chat-preview>
    <chat-preview chat-id="8"></chat-preview>
    <chat-preview chat-id="9"></chat-preview>
    <chat-preview chat-id="10"></chat-preview>
    <div class="new-chat">
      <img class="Cr-chat" src='https://www.clan-tlh.com/wp-content/uploads/2018/11/onlineExp_chat_icon1.png'>
    </div>
</div>
`;

Fill();

class ChatMesList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('chat-list', ChatMesList);
