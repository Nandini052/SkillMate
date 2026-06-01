// utils/test-data.js
class TestData {
    static initializeTestUsers() {
        const testUsers = [
            {
                id: "1",
                firstName: "Sarah",
                lastName: "Chen",
                email: "sarah@example.com",
                password: "password123",
                avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff",
                skillsOffered: ["Web Development", "JavaScript", "React"],
                skillsNeeded: ["Graphic Design", "UI/UX"],
                bio: "Frontend developer passionate about teaching web technologies",
                profileComplete: true,
                connections: []
            },
            {
                id: "2", 
                firstName: "Marcus",
                lastName: "Rodriguez",
                email: "marcus@example.com",
                password: "password123",
                avatar: "https://ui-avatars.com/api/?name=Marcus+Rodriguez&background=00b894&color=fff",
                skillsOffered: ["Graphic Design", "UI/UX", "Photoshop"],
                skillsNeeded: ["Web Development", "JavaScript"],
                bio: "Designer looking to learn coding to build my own projects",
                profileComplete: true,
                connections: []
            },
            {
                id: "3",
                firstName: "Aisha",
                lastName: "Johnson", 
                email: "aisha@example.com",
                password: "password123",
                avatar: "https://ui-avatars.com/api/?name=Aisha+Johnson&background=fd79a8&color=fff",
                skillsOffered: ["Data Science", "Python", "Machine Learning"],
                skillsNeeded: ["Spanish", "Public Speaking"],
                bio: "Data scientist interested in language exchange",
                profileComplete: true,
                connections: []
            }
        ];

        // Only initialize if no users exist
        const existingUsers = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
        if (existingUsers.length === 0) {
            localStorage.setItem('skillswap_users', JSON.stringify(testUsers));
            console.log('Test users created!');
        }
    }
}

// Auto-initialize when this script loads
TestData.initializeTestUsers();