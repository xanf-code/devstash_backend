const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    title: String,
    body: String,
    image: String,
    createdAt: String,
    userID: String,
    username: String,
    tag: String,
    likes: [
        {
            username: String,
            userID: String,
            createdAt: String,
        }
    ],
    views: [
        {
            uuid: String,
            createdAt: String,
        }
    ],
    likeCount: Number,
    viewCount: Number,
    score: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
});

module.exports = model('Posts', postSchema);