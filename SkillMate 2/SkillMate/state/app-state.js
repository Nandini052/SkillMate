// state/app-state.js
class AppState {
    constructor() {
      this.listeners = new Set();
      this.state = {
        user: null,
        skills: [],
        matches: [],
        ui: {
          loading: false,
          theme: 'light'
        }
      };
    }
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.notifyListeners();
    }
  
    subscribe(listener) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }
  
    notifyListeners() {
      this.listeners.forEach(listener => listener(this.state));
    }
  
    // Actions
    async login(userData) {
      this.setState({ ui: { ...this.state.ui, loading: true } });
      try {
        // Simulate API call
        const user = await this.mockLoginAPI(userData);
        this.setState({ user, ui: { ...this.state.ui, loading: false } });
        return user;
      } catch (error) {
        this.setState({ ui: { ...this.state.ui, loading: false } });
        throw error;
      }
    }
  
    async loadSkills() {
      const skills = await this.mockSkillsAPI();
      this.setState({ skills });
    }
  
    mockLoginAPI(userData) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({
          id: 1,
          name: userData.email.split('@')[0],
          email: userData.email,
          avatar: `https://ui-avatars.com/api/?name=${userData.email.split('@')[0]}&background=6366f1&color=fff`
        }), 1000);
      });
    }
  
    mockSkillsAPI() {
      return Promise.resolve([
        { id: 1, title: "Web Development", category: "Technology", icon: "code" },
        { id: 2, title: "Graphic Design", category: "Design", icon: "image" }
      ]);
    }
  }
  
  // Singleton instance
  const appState = new AppState();
  window.appState = appState; // For development