// utils/test-data-enhanced.js
class EnhancedTestData {
    static initializeTestUsers() {
        const testUsers = [
            {
                id: "user1",
                firstName: "Sarah",
                lastName: "Chen",
                email: "sarah@example.com",
                password: "123",
                avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff",
                skillsOffered: ["Web Development", "JavaScript", "React"],
                skillsNeeded: ["Graphic Design", "UI/UX"],
                bio: "Frontend developer passionate about teaching web technologies",
                profileComplete: true,
                connections: ["user2"], // Already connected to Marcus
                requests: [
                    {
                        id: "req1",
                        fromUserId: "user3",
                        toUserId: "user1", 
                        status: "pending",
                        createdAt: new Date(Date.now() - 3600000).toISOString(),
                        message: "I'd love to learn web development from you!"
                    },
                    {
                        id: "req2", 
                        fromUserId: "user4",
                        toUserId: "user1",
                        status: "pending",
                        createdAt: new Date(Date.now() - 7200000).toISOString(),
                        message: "Hi! I can help with Spanish in exchange for web development lessons."
                    }
                ]
            },
            {
                id: "user2",
                firstName: "Marcus",
                lastName: "Rodriguez", 
                email: "marcus@example.com",
                password: "123",
                avatar: "https://ui-avatars.com/api/?name=Marcus+Rodriguez&background=00b894&color=fff",
                skillsOffered: ["Graphic Design", "UI/UX", "Photoshop"],
                skillsNeeded: ["Web Development", "JavaScript"],
                bio: "Designer looking to learn coding to build my own projects",
                profileComplete: true,
                connections: ["user1"], // Already connected to Sarah
                requests: []
            },
            {
                id: "user3", 
                firstName: "Aisha",
                lastName: "Johnson",
                email: "aisha@example.com", 
                password: "123",
                avatar: "https://ui-avatars.com/api/?name=Aisha+Johnson&background=fd79a8&color=fff",
                skillsOffered: ["Data Science", "Python", "Machine Learning"],
                skillsNeeded: ["Spanish", "Public Speaking"],
                bio: "Data scientist interested in language exchange",
                profileComplete: true,
                connections: [],
                requests: []
            },
            {
                id: "user4",
                firstName: "Alex",
                lastName: "Thompson",
                email: "alex@example.com",
                password: "123", 
                avatar: "https://ui-avatars.com/api/?name=Alex+Thompson&background=ff7675&color=fff",
                skillsOffered: ["Spanish", "French", "Language Tutoring"],
                skillsNeeded: ["Data Science", "Python"],
                bio: "Language enthusiast and tutor",
                profileComplete: true,
                connections: [],
                requests: []
            }
        ];

        // Only initialize if no users exist
        const existingUsers = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
        if (existingUsers.length === 0) {
            localStorage.setItem('skillswap_users', JSON.stringify(testUsers));
            
            // Set current user as Sarah (who has pending requests)
            localStorage.setItem('skillswap_current_user', JSON.stringify(testUsers[0]));
            
            const session = {
                userId: testUsers[0].id,
                token: btoa(JSON.stringify({ userId: testUsers[0].id, timestamp: Date.now() })),
                expiresAt: Date.now() + (24 * 60 * 60 * 1000)
            };
            localStorage.setItem('skillswap_session', JSON.stringify(session));
            
            console.log('Enhanced test users created! Sarah has 2 pending requests.');
        }
    }
}

// Auto-initialize
EnhancedTestData.initializeTestUsers();