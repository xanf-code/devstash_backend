const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000
require('dotenv').config();
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    playground: true,
    // cors: {
    //     origin: "*",
    //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     preflightContinue: false,
    //     credentials: true
    // },
    typeDefs,
    resolvers,
});

let mongoURL = process.env.MONGODB;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`MongoDB Connected`)
    return server.listen({ port: PORT })
}).then(
    (res) => console.log(`server running at ${res.url}`)
).catch((err) => {
    console.log(err);
})
