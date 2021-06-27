const Post = require('../../models/Posts');
const checkUser = require('../utils/checkUser')

module.exports = {
    Mutation: {
        async likePost(_, { userID, postID }) {
            try {
                const user = await checkUser(userID);
                const post = await Post.findById(postID);
                if (userID) {
                    if (post) {
                        if (post.likes.find(like => like.userID === userID)) {
                            post.likes = post.likes.filter(like => like.userID !== userID)
                        } else {
                            post.likes.push({
                                userID: user._id,
                                username: user.name,
                                createdAt: new Date().toISOString(),
                            })
                        }
                        await post.save();
                        return post;
                    }
                    else {
                        throw new Error('Post not found');
                    }
                } else {
                    throw new Error('Invalid user ID');
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}