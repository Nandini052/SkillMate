// components/feature-card.js
class FeatureCard extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      const icon = this.getAttribute('icon') || 'star';
      const title = this.getAttribute('title') || 'Feature';
      const description = this.getAttribute('description') || 'Amazing feature description';
      const gradient = this.getAttribute('gradient') || 'from-indigo-500 to-purple-500';
  
      this.innerHTML = `
        <div class="feature-card bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 p-8 transition-all duration-500 transform hover:scale-105 group cursor-pointer h-full">
          <div class="w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <i data-feather="${icon}" class="text-white w-6 h-6"></i>
          </div>
          
          <h3 class="text-xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r ${gradient} group-hover:bg-clip-text transition-all duration-300">
            ${title}
          </h3>
          
          <p class="text-gray-600 leading-relaxed">
            ${description}
          </p>
          
          <div class="mt-6 flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
            Learn more
            <i data-feather="arrow-right" class="w-4 h-4 ml-2"></i>
          </div>
        </div>
      `;
      
      feather.replace();
    }
  }
  
  customElements.define('feature-card', FeatureCard);
