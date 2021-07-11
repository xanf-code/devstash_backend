const Users = require('../../models/Users');
const Posts = require('../../models/Posts');

module.exports = {
    Query: {
        async getBookmarksPosts(_, { userID }) {
            try {
                if (userID) {
                    const userData = await Users.findById(userID);
                    const bookmarks = userData.bookmarks.bookmark;
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
                        const bookmark = userData.bookmarks.bookmark;
                        if (bookmark.includes(postID)) {
                            bookmark.remove(postID);
                        }
                        else {
                            if (bookmark.length < 25) {
                                bookmark.push(postID);
                            } else {
                                throw new Error('LIMIT has been reached');
                            }
                        }
                        await userData.save();
                        return userData;
                    } else {
                        throw new Error('No user associated with this user ID');
                    }
                }
            } catch (error) {
                throw new Error('Something went wrong!');
            }
        },
        async addStashName(_, { userID, name }) {
            try {
                const user = Users.findById(userID)
                if (user) {
                    await Users.findByIdAndUpdate(
                        userID,
                        {
                            $set: {
                                'bookmarks.name': name
                            }
                        });
                    return `Updated to ${name}`;
                }
            } catch (error) {
                throw new Error('Something went wrong!');
            }
        }
    }
}