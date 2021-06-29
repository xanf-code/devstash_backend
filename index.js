const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs, resolvers
});

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`MongoDB Connected`)
    return server.listen({ port: process.env.PORT || 5000 })
}).then(
    (res) => console.log(`server running at ${res.url}`)
).catch((err) => {
    console.log(err);
})