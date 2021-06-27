const User = require('../../models/Users');

module.exports = async (userID) => {
    try {
        const user = await User.findById(userID);
        if (!user) {
            throw new Error("User does not exist");
        } else {
            return {
                ...user._doc,
                uid: user._id,
                userName: user.name,
            };
        }
    } catch (error) {
        throw new Error("User does not exist");
    }
}