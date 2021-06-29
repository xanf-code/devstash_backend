const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const likesResolvers = require('./likes');
const viewsResolvers = require('./views');

module.exports = {
    Post: {
        // TRENDING ALGORITHM
        score(parent) {
            let lc = parent.likes.length;
            let vc = parent.views.length;
            const point = ((vc * 0.5) + (lc * 1));
            var createdAt = parseInt(parent.createdAt);
            var currentTimestamp = Math.round(new Date().getTime() / 1000);
            var hour = (currentTimestamp - createdAt) / 60 / 60;
            hour = hour < 1 ? hour.toFixed(2) : Math.round(hour);
            if (point <= 1.5) {
                return 0;
            } else {
                var q1 = point - 1.5;
                let t = hour + 2;
                var q2 = Math.pow(t, 1.8);
                return q1 / q2;
            }
        },
        points(parent) {
            let lc = parent.likes.length;
            let vc = parent.views.length;
            const point = ((vc * 0.5) + (lc * 1));
            return point;
        },
        hours(parent) {
            var createdAt = parseInt(parent.createdAt);
            var currentTimestamp = Math.round(new Date().getTime() / 1000);
            var subt = (currentTimestamp - createdAt) / 60 / 60;
            subt = subt < 1 ? subt.toFixed(2) : Math.round(subt);
            return subt;
        },
    },
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...likesResolvers.Mutation,
        ...viewsResolvers.Mutation,
    }
}