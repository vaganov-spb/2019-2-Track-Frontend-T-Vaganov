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
    right:12px;
    bottom:12px;
    height:65px;
    width:65px;
    border-radius:50%;
  }

  .Cr-chat {
    display: block;
    border-radius:50%;
    width:100%;
    cursor:pointer;
    filter:brightness(160%);
    box-shadow: 0 0 0 rgba(16, 125, 238, 1);
    animation: pulse 1.5s infinite;
  }

  .Cr-chat:hover {
    animation: none;
  }
  
  @keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(16, 125, 238, 1);
    }
    30% {
      box-shadow: 0 0 0 0 rgba(16, 125, 238, 0.5);
    }
    70% {
        box-shadow: 0 0 0 9px rgba(16, 125, 238, 0);      
    }
    100% {
        box-shadow: 0 0 0 0 rgba(16, 125, 238, 0);    
    }
  }

  chat-preview {
    color:black;
    transition: box-shadow 1.5s, border-radius 1.5s, backdrop-filter 1.0s;
  }

  chat-preview:hover {
    box-shadow: 0 0 10px #8e24aa;
    border-radius: 22px;
    border: 1px solid #8e24aa;
    --border: None;
  }

  chat-preview:active {
    color:yellow;
    backdrop-filter: invert(.999);
    filter:brightness(200%);
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
      <img class="Cr-chat" src='https://cdn1.iconfinder.com/data/icons/ui-5/502/chat-512.png'>
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
