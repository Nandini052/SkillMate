// utils/chat-system.js
class ChatSystem {
    static getChats(userId) {
        const chats = JSON.parse(localStorage.getItem('skillswap_chats') || '{}');
        return chats[userId] || [];
    }

    static getOrCreateChat(userId1, userId2) {
        const chatId = [userId1, userId2].sort().join('_');
        const chats = JSON.parse(localStorage.getItem('skillswap_chats') || '{}');
        
        if (!chats[userId1]) chats[userId1] = {};
        if (!chats[userId2]) chats[userId2] = {};
        
        if (!chats[userId1][chatId]) {
            chats[userId1][chatId] = {
                id: chatId,
                userId: userId2,
                userName: this.getUserName(userId2),
                userAvatar: this.getUserAvatar(userId2),
                messages: [],
                lastMessageAt: new Date().toISOString(),
                unreadCount: 0
            };
        }
        
        if (!chats[userId2][chatId]) {
            chats[userId2][chatId] = {
                id: chatId,
                userId: userId1,
                userName: this.getUserName(userId1),
                userAvatar: this.getUserAvatar(userId1),
                messages: [],
                lastMessageAt: new Date().toISOString(),
                unreadCount: 0
            };
        }
        
        localStorage.setItem('skillswap_chats', JSON.stringify(chats));
        return chats[userId1][chatId];
    }

    static sendMessage(chatId, fromUserId, toUserId, message) {
        const chats = JSON.parse(localStorage.getItem('skillswap_chats') || '{}');
        const timestamp = new Date().toISOString();
        
        const newMessage = {
            id: 'msg_' + Date.now(),
            fromUserId,
            toUserId,
            message,
            timestamp,
            read: false
        };

        // Add message to both users' chat
        if (chats[fromUserId] && chats[fromUserId][chatId]) {
            chats[fromUserId][chatId].messages.push(newMessage);
            chats[fromUserId][chatId].lastMessageAt = timestamp;
        }
        
        if (chats[toUserId] && chats[toUserId][chatId]) {
            chats[toUserId][chatId].messages.push(newMessage);
            chats[toUserId][chatId].lastMessageAt = timestamp;
            chats[toUserId][chatId].unreadCount = (chats[toUserId][chatId].unreadCount || 0) + 1;
        }

        localStorage.setItem('skillswap_chats', JSON.stringify(chats));
        return newMessage;
    }

    static getUserName(userId) {
        const users = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
        const user = users.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
    }

    static getUserAvatar(userId) {
        const users = JSON.parse(localStorage.getItem('skillswap_users') || '[]');
        const user = users.find(u => u.id === userId);
        return user ? user.avatar : 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff';
    }

    static markAsRead(chatId, userId) {
        const chats = JSON.parse(localStorage.getItem('skillswap_chats') || '{}');
        if (chats[userId] && chats[userId][chatId]) {
            chats[userId][chatId].unreadCount = 0;
            // Mark all messages as read
            chats[userId][chatId].messages.forEach(msg => {
                if (msg.toUserId === userId) msg.read = true;
            });
            localStorage.setItem('skillswap_chats', JSON.stringify(chats));
        }
    }
}