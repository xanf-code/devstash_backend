const Users = require('../../models/Users');
const Posts = require('../../models/Posts');

module.exports = {
    Query: {
        async getBookmarksPosts(_, { userID }) {
            try {
                if (userID) {
                    const userData = await Users.findById(userID);
                    const bookmarks = userData.bookmarks;
                    const posts = await Posts.find({ '_id': { $in: bookmarks } });
                    return posts;
                }
                else {
                    throw new Error('Invalid User ID', error);
                }
            } catch (error) {
                throw new Error('Something went wrong!', error);
            }
        }
    },
    Mutation: {
        async addBookmark(_, { userID, postID }) {
            try {
                if (userID && postID) {
                    const userData = await Users.findById(userID);
                    if (userData) {
                        const bookmark = userData.bookmarks;
                        if (bookmark.includes(postID)) {
                            bookmark.remove(postID);
                        }
                        else {
                            bookmark.push(postID);
                        }
                        await userData.save();
                        return userData;
                    } else {
                        throw new Error('No user associated with this user ID');
                    }
                }
            } catch (error) {
                throw new Error('Something went wrong!', error);
            }
        }
    }
}