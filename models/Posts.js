const { model, Schema } = require('mongoose');

const creatorSchema = new Schema({
    username: String,
    userImage: String,
    userID: String,
})

const postSchema = new Schema({
    title: String,
    body: String,
    image: String,
    createdAt: String,
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
    creator: {
        type: creatorSchema,
        _id: false,
    }
});

module.exports = model('Posts', postSchema);