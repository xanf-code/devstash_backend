const gql = require('graphql-tag');

module.exports = gql`
    type Post {
        id: ID!
        tag: String!
        body: String!
        score: Float!
        createdAt: String!
        title: String!
        userID: String!,
        username: String!,
        likes: [Like]!
        views: [View]!
        hours: Float!
        likeCount: Int!
        viewCount: Int!
        points: Float!
    }
    type Like{
        id: ID!
        username: String!
        userID: String!
        createdAt: String!
    }
    type View{
        id: ID!
        uuid: String!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String
        image: String!
        name: String!
        createdAt: String!
        updatedAt: String!
    }
    type Query{
        getPosts: [Post]
        getUsers: [User]
        getPost(postID: ID): Post
        getUser(userID: ID): User
    }
    type Mutation{
        userData(_id: ID!): User!
        createPost(userID: String!,body:String!,title:String!, tag:String!): Post!
        deletePost(userID: String! postID: ID!) : String!
        likePost(userID: String! postID: ID!) : Post!
        addView(userID: String! postID: ID!) : Post!
    }
`;