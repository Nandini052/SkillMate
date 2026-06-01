// components/skill-card.js - ENHANCED VERSION
class SkillCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isLiked = false;
    }
  
    connectedCallback() {
      this.render();
      this.setupInteractions();
    }
  
    static get observedAttributes() {
      return ['title', 'icon', 'description', 'category', 'likes'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
  
    setupInteractions() {
      this.shadowRoot.addEventListener('click', (e) => {
        if (e.target.closest('.like-btn')) {
          this.toggleLike();
        }
        if (e.target.closest('.skill-card')) {
          this.dispatchEvent(new CustomEvent('skill-selected', {
            detail: {
              title: this.getAttribute('title'),
              category: this.getAttribute('category')
            },
            bubbles: true
          }));
        }
      });
    }
  
    toggleLike() {
      this.isLiked = !this.isLiked;
      const likeBtn = this.shadowRoot.querySelector('.like-btn');
      const likeIcon = likeBtn.querySelector('i');
      
      likeBtn.classList.toggle('text-red-500', this.isLiked);
      likeBtn.classList.toggle('text-gray-400', !this.isLiked);
      
      likeIcon.setAttribute('data-feather', this.isLiked ? 'heart' : 'heart');
      feather.replace();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          ${this.getStyles()}
        </style>
        ${this.getTemplate()}
      `;
      feather.replace();
    }
  
    getStyles() {
      return `
        .skill-card {
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skill-card:hover {
          transform: translateY(-4px);
        }
        .category-badge {
          position: relative;
          overflow: hidden;
        }
        .category-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .skill-card:hover .category-badge::before {
          left: 100%;
        }
        .pulse-once {
          animation: pulseOnce 0.5s ease-in-out;
        }
        @keyframes pulseOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `;
    }
  
    getTemplate() {
      const title = this.getAttribute('title') || 'Skill';
      const icon = this.getAttribute('icon') || 'code';
      const description = this.getAttribute('description') || 'Learn this skill';
      const category = this.getAttribute('category') || 'General';
      
      return `
        <div class="skill-card bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 p-6 cursor-pointer group">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <i data-feather="${icon}" class="text-indigo-600 w-6 h-6"></i>
            </div>
            <button class="like-btn text-gray-400 hover:text-red-500 transition-colors duration-200">
              <i data-feather="heart" class="w-5 h-5"></i>
            </button>
          </div>
          
          <h3 class="font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-200">${title}</h3>
          <p class="text-gray-600 text-sm mb-4">${description}</p>
          
          <div class="flex justify-between items-center">
            <span class="category-badge bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">${category}</span>
            <span class="text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
              Explore →
            </span>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('skill-card', SkillCard);