const Post = require('../../models/Posts');
const { updateViews } = require('../utils/updateScore')

module.exports = {
    Mutation: {
        async addView(_, { userID, postID }) {
            try {
                const post = await Post.findById(postID);
                if (userID) {
                    if (post) {
                        if (post.views.find(view => view.uuid === userID)) {
                            return post;
                        } else {
                            post.views.push({
                                uuid: userID,
                                createdAt: new Date().toISOString(),
                            })
                        }
                        updateViews(post);
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