// components/swap-requests.js
class SwapRequests extends HTMLElement {
    constructor() {
        super();
        this.requests = [];
    }

    connectedCallback() {
        this.loadRequests();
        this.render();
    }

    async loadRequests() {
        // This will use your existing request-system.js
        if (window.requestSystem) {
            this.requests = await window.requestSystem.getIncomingRequests();
            this.render();
        }
    }

    render() {
        this.innerHTML = `
            <div class="swap-requests-panel">
                <div class="panel-header">
                    <h3>Swap Requests</h3>
                    <span class="badge">${this.requests.length}</span>
                </div>
                <div class="requests-list">
                    ${this.requests.length ? 
                        this.requests.map(request => this.renderRequest(request)).join('') :
                        '<p class="no-requests">No pending requests</p>'
                    }
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderRequest(request) {
        return `
            <div class="request-card" data-request-id="${request.id}">
                <div class="request-header">
                    <img src="${request.sender.avatar}" alt="${request.sender.name}" class="avatar">
                    <div class="user-info">
                        <strong>${request.sender.name}</strong>
                        <span>wants your: <em>${request.requestedSkill}</em></span>
                        <span>offers: <em>${request.offeredSkill}</em></span>
                    </div>
                    <button class="profile-btn" onclick="viewProfile('${request.sender.id}')">View Profile</button>
                </div>
                
                <div class="request-details">
                    <p>💬 "${request.message}"</p>
                    <p>📅 ${request.proposedTiming}</p>
                </div>

                <div class="request-actions">
                    <button class="accept-btn">Accept</button>
                    <button class="decline-btn">Decline</button>
                    <button class="remove-btn" title="Remove this request">⋯</button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add your click handlers here
        this.querySelectorAll('.accept-btn').forEach(btn => {
            btn.addEventListener('click', this.handleAccept.bind(this));
        });
        // ... similar for decline/remove
    }

    handleAccept(event) {
        const requestId = event.target.closest('.request-card').dataset.requestId;
        // Call your request-system.js accept method
        if (window.requestSystem) {
            window.requestSystem.acceptRequest(requestId);
        }
    }
}

customElements.define('swap-requests', SwapRequests);