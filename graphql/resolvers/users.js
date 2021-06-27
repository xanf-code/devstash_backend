const { UserInputError } = require('apollo-server');
const User = require('../../models/Users');

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getUser(_, { userID }) {
            try {
                const user = await User.findById(userID);
                if (user) {
                    return user;
                } else {
                    throw new Error('User Not Found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async userData(_, { _id }) {
            const user = await User.findOne({ _id });

            if (!user) {
                // Errors
                throw new UserInputError('User not found');
            }

            return {
                ...user._doc,
                id: user._id,
            };
        }
    }
}