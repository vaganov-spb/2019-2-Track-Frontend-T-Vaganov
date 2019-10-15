const template = document.createElement('template');
template.innerHTML = `
<style>

.message {
    font-size:13px;
    border: 1px solid #dfbddf;
    border-radius:4px; 
    background-color:#f3cef7;
    max-width:200px;
    min-width:40px;
    margin: 0 2px 4px 0;
    display: flex;
    flex-direction:column;
    align-items: flex-end;
    padding:5px 12px 3px 8px;
    box-shadow: 0 1px 1px #dfbddf;
    flex: none;
}

.text_ms {
    line-height:18px;
    word-wrap:break-word;
}

.text {
    width:100%;
    font-size:15px;
    color:#201e20;
}

.right_text {
  color:#696969;
  font-size:12px;
  line-height:12px;
  margin-top:5px;
}

</style>

<div class="message">
    <div class="text_ms text"></div> 
    <div class="text_ms right_text"></div>
</div>
`;

class MessageRule extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$message = this._shadowRoot.querySelector('.text');
    this.$time = this._shadowRoot.querySelector('.right_text');
  }

  static get observedAttributes() {
    return ['message', 'time'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'message') {
      this.$message.innerText = newValue;
    }
    if (name === 'time') {
      this.$time.innerText = newValue;
    }
  }
}

customElements.define('mess-rule', MessageRule);
