/* eslint-disable prefer-destructuring */
const template = document.createElement('template');
template.innerHTML = `
<style>
.chat-pre {
  display:flex;
  min-height:54px;
  max-height:55px;
  width: 100%;
  flex-direction: row;
  flex:none;
}
 
.foto {
  height:100%;
  width:12%;
  border-radius:50%;
}

.user_foto {
  width: 100%;
  height:100%;
  border-radius:50%;
}

.pers-info {
  min-height:53px;
  height:100%;
  width:88%;
  border: 1px solid #DCDCDC;
  border-top:none;
  border-left:none;
  border-right:none;
  display:flex;
  flex-direction: row;
}
 
.user-info {
  height:100%;
  width:80%;
  padding-left:4%;
  padding-bottom:2%;
  padding-top:1%;
}

.Name {
  color:black;
}

.usr_name {
  letter-spacing:0.03em;
  max-width:100%;
}

.last-ms {
  font-size:13px;
  color:grey;
  max-width:100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height:20px;
}

.time-check {
  height:100%;
  width:15%;
  display:flex;
  flex-direction:column; 
}

.Time {
  padding-top:14%;
  height:100%;
  width:100%;
}

.time {
  color:grey;
  font-size:12px;
  height: 15px;
}

.indicate {
  width: 100%;
  height:100%;
  align:center;
}

.indicate-img {
  width: 100%;
  height:100%;
}

.indicator {
  width:40%;
  filter: invert(0.999);
  margin-left:12%;
}

</style>

<div class="chat-pre" chat-id ="1">
<div class="foto">  
        <img class="user_foto">
</div>
<div class="pers-info">
    <div class="user-info">
        <div class="Name">
            <span class="usr_name"></span>
        </div>
        <div class="last-mes">
            <div class="last-ms"></div>
        </div>
    </div>
    <div class="time-check">
        <div class="Time">
            <span class="time"></span>
        </div>  
        <div class="indicate">
            <div class="indicate-img">
                <img class="indicator">
            </div>
        </div>
    </div>
</div>     
</div>
`;

class ChatPreview extends HTMLElement {
  constructor() {
    super();
    this._chatId = -1;
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$root = this._shadowRoot.querySelector('.chat-pre');
    this.$name = this._shadowRoot.querySelector('.usr_name');
    this.$photo = this._shadowRoot.querySelector('.user_foto');
    this.$lastmes = this._shadowRoot.querySelector('.last-ms');
    this.$indicator = this._shadowRoot.querySelector('.indicator');
    this.$time = this._shadowRoot.querySelector('.time');
    this.$container = document.getElementById('container');
    this.$root.addEventListener('click', this._onClick.bind(this));
  }

  _onClick(event) {
    event.preventDefault();

    const flag = JSON.parse(localStorage.getItem(`${this._chatId}`));
    flag.flag = true;
    localStorage.setItem(`${this._chatId}`, JSON.stringify(flag));

    this.$container.innerHTML = `<chat-form chat-id="${this._chatId}"></chat-form>`;
  }

  static get observedAttributes() {
    return ['chat-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'chat-id') {
      this._chatId = newValue;
      this.$name.innerText = JSON.parse(localStorage.getItem(`${newValue}`)).name;
      // eslint-disable-next-line prefer-destructuring

      const obj = JSON.parse(localStorage.getItem(`${newValue}`));
      if ('mes' in obj && obj.mes.length !== 0) {
        const text = JSON.parse(localStorage.getItem(`${newValue}`)).mes[JSON.parse(localStorage.getItem(`${newValue}`)).mes.length - 1][0];
        this.$lastmes.innerText = text;
        const hours = JSON.parse(localStorage.getItem(`${newValue}`)).mes[JSON.parse(localStorage.getItem(`${newValue}`)).mes.length - 1][1];
        const minutes = JSON.parse(localStorage.getItem(`${newValue}`)).mes[JSON.parse(localStorage.getItem(`${newValue}`)).mes.length - 1][2];
        this.$time.innerText = `${hours}:${minutes}`;
      } else {
        this.$lastmes.innerText = '';
        this.$time.innerText = '';
        obj.mes = [];
        obj.flag = null;
        localStorage.setItem(`${this._chatId}`, JSON.stringify(obj));
      }

      this.$photo.setAttribute('src', JSON.parse(localStorage.getItem(`${newValue}`)).url);

      const flag = JSON.parse(localStorage.getItem(`${this._chatId}`)).flag;
      if (flag === false) {
        this.$indicator.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Google_Material_Design_check.svg/1024px-Google_Material_Design_check.svg.png');
      }
      if (flag === true) {
        this.$indicator.setAttribute('src', 'https://cdn.iconscout.com/icon/premium/png-512-thumb/double-tick-2-571364.png');
      }
    }
  }
}

customElements.define('chat-preview', ChatPreview);
