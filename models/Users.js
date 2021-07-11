const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    image: String,
    createdAt: String,
    updatedAt: String,
    email: String,
    bookmarks: {
        name: {
            type: String,
            default: "Example-Stash"
        },
        public: {
            type: Boolean,
            default: true
        },
        bookmark: [String]
    }
});

module.exports = model('Users', userSchema);