const template = document.createElement('template');
template.innerHTML = `
<style>
  .main_head {
    border: 1px solid #8E24AA;
    background-color: #8E24AA;
  }
  
  .message-header-bottom {
    height: 50px;
    width: 100%;
    border: 1px solid #8E24AA;
    background-color: #8E24AA;
    align-items: flex-end;
    flex-direction: row;
    display: flex;
    line-height: 90%;
  }
  
  .message-header-img { 
    width:13%;
    margin-left:5%;
    height:90%;
    margin-bottom: 1%;
    margin-right:1%;
  }
  
  .avatar {
    height: 100%;
    border-radius: 50%;
    float: left;
  }
  
  .username {
    width: auto;
    min-width:40%;
    margin-left: 50%;
    padding-top:1%;
    height: 80%;
    color:white;
    margin-left: 1%;
    margin-bottom: 0%;
    font-size: 18px;  
  }
  
  .online {
    font-size: 8px;
    margin-bottom: 0%;
    height: 10px;
    color:rgb(180, 177, 177);
    margin-top: 3%;
  }
  
  .search_icons {
    width: 30%;
    color: white;
    height: 40%;
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 4%;
    
  }
  
  .arrow {
    width : 10%;
    color:white;
    height: 60%;
    float: left;
    margin-bottom: 2%;
    margin-left: 4%;
   
  }
  
  .top_icons {
    margin-top:2px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
  }
  
  .user {
    letter-spacing:normal;
  }
  
  .top {
    width: 20%;
    float: right;
    margin-bottom: 0%;
    float: right;
    color: #DDA0DD;
  }
  
  .fa {
    cursor: pointer;
  }

  .fa .fa-arrow-left {
    margin-top 2px;
  }

</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<div class ="main_head">
    <div class="top">
        <div class="top_icons">
            <i class="fa fa-circle"></i>
            <i class="fa fa-battery-three-quarters"></i>
            <i class="fa fa-apple"></i>
        </div>
    </div>
    <div class="message-header-bottom">
        <div class="arrow">
            <span style="font-size: 26px; color: white;">
                <i class="fa fa-arrow-left"></i>
            </span>
        </div>
        <div class="message-header-img">
            <img class="avatar">
        </div>

        <div class="username">
            <span class="user"></span>
            <p class="online">в сети 2 часа назад</p>
        </div>
        <div class="search_icons">
            <span style="font-size: 22px; color: white;">
                <i class="fa fa-search"></i>
            </span>
            <span style="font-size: 22px; color: white;">
                <i class="fa fa-ellipsis-v"></i>
            </span>
        </div>
    </div>
</div>
<message-form action="/"></message-form>
`;

class Chats extends HTMLElement {
  constructor() {
    super();
    this._chatId = -1;
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$chat = this.shadowRoot.querySelector('message-form');
    this.$user = this.shadowRoot.querySelector('.user');
    this.$return = this.shadowRoot.querySelector('.fa-arrow-left');
    this.$return.addEventListener('click', this._onClickReturn.bind(this));
    this.$container = document.getElementById('container');
    this.$img = this.shadowRoot.querySelector('img');
  }


  _loadInfo() {
    if (this._chatId !== -1) {
      if (localStorage.getItem(`${this._chatId}`) === null) {
        localStorage.setItem(`${this._chatId}`, JSON.stringify({
          name: 'Jennyfer Eshley',
          flag: true,
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Emoji_u1f608.svg/1024px-Emoji_u1f608.svg.png',
          mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
        }));
      }
    }
  }

  static get observedAttributes() {
    return ['chat-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'chat-id') {
      this._chatId = newValue;
      this._loadInfo();
      this.$chat.setAttribute(name, newValue);
      this.$user.innerText = JSON.parse(localStorage.getItem(`${newValue}`)).name;
      this.$img.src = JSON.parse(localStorage.getItem(`${newValue}`)).url;
    }
  }

  _onClickReturn(event) {
    event.preventDefault();
    this.$container.innerHTML = '<chat-list></chat-list>';
  }
}

customElements.define('chat-form', Chats);
