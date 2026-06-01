// components/footer.js
class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-gray-800 text-white py-8 mt-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 class="text-lg font-bold mb-4">SkillMate</h3>
                            <p class="text-gray-400">Connecting students through skill exchange and peer learning.</p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Quick Links</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="index.html" class="hover:text-white transition duration-200">Home</a></li>
                                <li><a href="dashboard.html" class="hover:text-white transition duration-200">Dashboard</a></li>
                                <li><a href="skills.html" class="hover:text-white transition duration-200">Skills</a></li>
                                <li><a href="community.html" class="hover:text-white transition duration-200">Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Support</h4>
                            <ul class="space-y-2 text-gray-400">
                                <li><a href="#" class="hover:text-white transition duration-200">Help Center</a></li>
                                <li><a href="#" class="hover:text-white transition duration-200">Contact Us</a></li>
                                <li><a href="#" class="hover:text-white transition duration-200">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-4">Connect</h4>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-400 hover:text-white transition duration-200">
                                    <i data-feather="facebook" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition duration-200">
                                    <i data-feather="twitter" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="text-gray-400 hover:text-white transition duration-200">
                                    <i data-feather="instagram" class="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 SkillMate. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        feather.replace();
    }
}

customElements.define('custom-footer', CustomFooter);