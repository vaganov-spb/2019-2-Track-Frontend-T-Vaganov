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
    
    width:12%;
    margin-left:4%;
    height:90%;
    margin-bottom: 1%;
  }
  
  img {
    width: 95%;
    height: 95%;
    border-radius: 50%;
    float: left;
  }
  
  .Username {
    width: 30%;
    margin-left: 50%;
    height: 35%;
    color:white;
    margin-left: 6%;
    margin-bottom: 4%;
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
    margin-left: 3%;
    cursor: pointer;
  }
  
  .arrow {
    width : 10%;
    color:white;
    height: 40%;
    float: left;
    margin-bottom: 4%;
    margin-left: 5%;
    cursor: pointer;
  }
  
  .top_icons {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
  }
  
  .top {
    width: 20%;
    float: right;
    margin-bottom: 0%;
    float: right;
    color: #DDA0DD;
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
            <span style="font-size: 22px; color: white;">
                <i class="fa fa-arrow-left"></i>
            </span>
        </div>
        <div class="message-header-img">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Emoji_u1f4a9.svg/1024px-Emoji_u1f4a9.svg.png'>
        </div>

        <div class="Username">Дженнифер 
            <p class="online">была в сети 2 часа назад</p>
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
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('chat-form', Chats);
