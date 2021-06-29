const Post = require('../../models/Posts');
const checkUser = require('../utils/checkUser')

module.exports = {
    Query: {
        async getPosts(_, { limit, tag, page, sortBy }) {
            try {
                if (tag) {
                    const post = await Post.find(
                        { "tag": tag }
                    ).skip((page - 1) * limit)
                        .limit(limit).sort(sortBy || "-createdAt");
                    return post;
                } else {
                    const post = await Post.find().skip((page - 1) * limit)
                        .limit(limit).sort(sortBy || "-createdAt");
                    return post;
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(_, { postID }) {
            try {
                const post = await Post.findById(postID);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post Not Found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { userID, body, title, tag }) {
            const user = await checkUser(userID);
            const newStash = new Post({
                body,
                title,
                tag,
                userID: user._id,
                username: user.name,
                createdAt: Math.round(new Date().getTime() / 1000),
                likeCount: 0,
                viewCount: 0,
            });

            const stash = await newStash.save();

            return stash;
        },

        async deletePost(_, { userID, postID }) {
            if (userID) {
                const user = await checkUser(userID);
                try {
                    const stash = await Post.findById(postID);
                    if (user._id == stash.userID) {
                        await stash.delete();
                        return 'Post deleted successfully';
                    } else {
                        throw new Error('Stay in your lane :(');
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        },

    }
}