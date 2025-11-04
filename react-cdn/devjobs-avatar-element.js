class DevJobsAvatarElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <img src="https://avatars.githubusercontent.com/u/92026671?v=4" alt="Avatar DevJobs" 
      class="avatar" style="width: 50px; height: 50px; border-radius: 99999px;" />
    `;
  }

  connectedCallback() {
    this.render();
    }
}

customElements.define('devjobs-avatar', DevJobsAvatarElement);

