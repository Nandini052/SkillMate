// utils/matchmaking.js
class MatchmakingSystem {
    static findMatches(currentUser) {
        const allUsers = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
        const otherUsers = allUsers.filter(user => 
            user.id !== currentUser.id && 
            user.profileComplete &&
            user.skillsOffered && 
            user.skillsNeeded
        );
        
        const matches = otherUsers.map(user => {
            const compatibility = this.calculateCompatibility(currentUser, user);
            const canTeachYou = user.skillsOffered.filter(skill => 
                currentUser.skillsNeeded.includes(skill)
            );
            const youCanTeach = currentUser.skillsOffered.filter(skill => 
                user.skillsNeeded.includes(skill)
            );

            return {
                user,
                compatibility,
                canTeachYou,
                youCanTeach,
                commonInterests: this.findCommonInterests(currentUser, user)
            };
        });

        // Filter matches with at least some compatibility and sort
        return matches
            .filter(match => match.compatibility > 0)
            .sort((a, b) => b.compatibility - a.compatibility);
    }

    static calculateCompatibility(user1, user2) {
        let score = 0;
        
        // Skills match (you need what they offer)
        const skillsTheyCanTeachYou = user2.skillsOffered.filter(offer => 
            user1.skillsNeeded.includes(offer)
        ).length;
        
        // Skills you can teach them
        const skillsYouCanTeachThem = user1.skillsOffered.filter(offer => 
            user2.skillsNeeded.includes(offer)
        ).length;

        score += (skillsTheyCanTeachYou + skillsYouCanTeachThem) * 25;
        
        // Bonus for mutual interests
        const commonInterests = this.findCommonInterests(user1, user2).length;
        score += commonInterests * 10;

        return Math.min(Math.max(score, 0), 100);
    }

    static findCommonInterests(user1, user2) {
        const allSkills = [...new Set([
            ...(user1.skillsOffered || []),
            ...(user1.skillsNeeded || []),
            ...(user2.skillsOffered || []),
            ...(user2.skillsNeeded || [])
        ])];
        
        return allSkills.filter(skill => 
            ((user1.skillsOffered || []).includes(skill) || (user1.skillsNeeded || []).includes(skill)) &&
            ((user2.skillsOffered || []).includes(skill) || (user2.skillsNeeded || []).includes(skill))
        );
    }
}