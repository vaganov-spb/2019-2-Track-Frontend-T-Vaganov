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

        .message {
            font-size:13px;
            border: 1px solid #DDA0DD;
            border-radius:7px; 
            background-color:#DDA0DD;
            width: auto;
            max-width:60%;
            min-width:30%;
            margin: 0 2px 4px 0;
            display: flex;
            flex-direction:column;
            align-items: flex-end;
            padding: 0px 3px 0 3px;
            flex: none;
        }
        
        .text_ms {
            line-height:18px;
            word-wrap:break-word;
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

        .text {
            width:100%;
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
    this.$local = [];
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this._shadowRoot.querySelector('form');
    this.$input = this._shadowRoot.querySelector('form-input');
    this.$message = this._shadowRoot.querySelector('.result');
    this.$img = this._shadowRoot.querySelector('img');
    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$img.addEventListener('click', this._onClick.bind(this));
    this._loadFromLS();
  }


  _loadFromLS() {
    for (let i = 1; i < localStorage.length; i += 1) {
      this.$local.push(JSON.parse(localStorage.getItem(`${i}`)));
    }

    this.$local.forEach((item) => {
      this.$message.insertAdjacentHTML('beforeend', `<div class="message"><div class="text_ms text">${item[0]}</div> <div class="text_ms">${item[1]}:${item[2]} ${item[3]}-${item[4]}-${item[5]}</div> <div class="text_ms">from Bobby</div></div>`);
    });
  }

  _onSubmit(event) {
    event.preventDefault();

    const mes = this.$input.value;
    const now = new Date();

    if (mes !== '') {
      let minutes = now.getMinutes();
      let hours = now.getHours();
      if (Number(now.getMinutes()) < 10) {
        minutes = `0${String(now.getMinutes())}`;
      }
      if (now.getHours() < 10) {
        hours = `0${now.getHours()}`;
      }
      this.$message.insertAdjacentHTML('beforeend', `<div class="message"><div class="text_ms text">${mes}</div> <div class="text_ms">${hours}:${minutes} ${now.getDate()}-${now.getMonth()}-${now.getFullYear()}</div> <div class="text_ms">from Bobby</div></div>`);

      const month = now.getMonth();
      const date = now.getDate();
      const year = now.getFullYear();
      const newRecord = JSON.stringify([mes, hours, minutes, date, month, year]);
      localStorage.setItem(`${localStorage.length}`, newRecord);

      this.$input.value = '';
    }
  }

  _onClick(event) {
    event.preventDefault();
    this.$form.dispatchEvent(new Event('submit'));
  }
}

customElements.define('message-form', MessageForm);
