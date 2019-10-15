// import { directive } from '@babel/types';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
        }

        .result {
            color: black;
            border:1px solid rgba(25, 25, 25, 0.32);
            height:400px;
            background-color:#FFFAFA;
            display: flex;
            flex-direction:column;
            align-items: flex-end;
            overflow:scroll;  
        }
        
        input[type=submit] {
            visibility: collapse;
        }
        
        .inp {
            display: flex;
            flex-direction:row;
            border: 1px solid rgba(25, 25, 25, 0.32);
            height: 40px;
        }

        img {
             width:10%;
             height:90%;
        }

    </style>
    <form>
    
        <div class="result"></div>
        <div class="inp">
            <form-input name="message-text" placeholder="Cooбщение"></form-input>
            <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/send-01-512.png">
           
        </div>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this._chatId = -1;
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this._shadowRoot.querySelector('form');
    this.$input = this._shadowRoot.querySelector('form-input');
    this.$message = this._shadowRoot.querySelector('.result');
    this.$img = this._shadowRoot.querySelector('img');
    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$img.addEventListener('click', this._onClick.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    this._loadFromLS();
  }


  _loadFromLS() {
    if (this._chatId !== -1) {
      this.$message.innerHTML = '';
      JSON.parse(localStorage.getItem(`${this._chatId}`)).mes.forEach((item) => {
        this.$message.insertAdjacentHTML('beforeend', `<mess-rule message="${item[0]}" time="${item[1]}:${item[2]}"></mess-rule>`);
        this.$message.scrollTop = this.$message.scrollHeight;
      });
    }
  }

  _onSubmit(event) {
    event.preventDefault();

    const mes = this.$input.value;
    const now = new Date();

    if (mes !== '') {
      const flag = JSON.parse(localStorage.getItem(`${this._chatId}`));
      flag.flag = false;
      localStorage.setItem(`${this._chatId}`, JSON.stringify(flag));

      let minutes = now.getMinutes();
      let hours = now.getHours();
      if (Number(now.getMinutes()) < 10) {
        minutes = `0${String(now.getMinutes())}`;
      }
      if (now.getHours() < 10) {
        hours = `0${now.getHours()}`;
      }

      this.$message.insertAdjacentHTML('beforeend', `<mess-rule message="${mes}" time="${hours}:${minutes}"></mess-rule>`);

      const mesR = JSON.parse(localStorage.getItem(`${this._chatId}`));
      mesR.mes.push([mes, hours, minutes]);

      localStorage.setItem(`${this._chatId}`, JSON.stringify(mesR));

      this.$input.value = '';
      this.$message.scrollTop = this.$message.scrollHeight;
    }
  }

  _onClick(event) {
    event.preventDefault();
    this.$form.dispatchEvent(new Event('submit'));
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  static get observedAttributes() {
    return ['chat-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'chat-id') {
      this._chatId = newValue;
      this._loadFromLS();
    }
  }
}


customElements.define('message-form', MessageForm);
