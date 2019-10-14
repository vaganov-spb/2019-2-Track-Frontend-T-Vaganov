const template = document.createElement('template');
template.innerHTML = `
<div class="list">
    <chat-preview chat-id="1"></chat-preview>
    <chat-preview chat-id="2"></chat-preview>
</div>
`;


class ChatMesList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('chat-list', ChatMesList);
