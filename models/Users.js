const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    image: String,
    createdAt: String,
    updatedAt: String,
    email: String,
    bookmarks: [String]
});

module.exports = model('Users', userSchema);