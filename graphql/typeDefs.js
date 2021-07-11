const gql = require('graphql-tag');

module.exports = gql`
    type StashResponse {
        posts: [Post]!
        count: Int!
        limit: Int!
        page: Int!
        hasNext: Boolean!
    }
    type Creator {
        username: String
        userImage: String
        userID: String
    }
    type Post {
        id: ID!
        tag: String!
        image: String!
        body: String!
        score: Float!
        createdAt: String!
        title: String!
        likes: [Like]!
        views: [View]!
        hours: Float!
        likeCount: Int!
        viewCount: Int!
        points: Float!
        creator: Creator
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
        bookmarks: Bookmark!
    }
    type Bookmark {
        name: String
        public: Boolean
        bookmark: [String]
    }
    type Query{
        getPosts(limit: Int, tag: String, page: Int, sortBy: String): StashResponse!
        getAllPosts: [Post]
        # getUsers: [User]
        getPost(postID: ID): Post
        getUser(userID: ID): User
        getBookmarksPosts(userID: ID): [Post] 
    }
    type Mutation{
        userData(_id: ID!): User!
        createPost(userID: String!,body:String!,title:String!, tag:String!, image: String!): Post!
        deletePost(userID: String! postID: ID!) : String!
        likePost(userID: String! postID: ID!) : Post!
        addView(userID: String! postID: ID!) : Post!
        addBookmark(userID: String! postID: String!) : User!
        addStashName(userID: String! name: String!) : String!
    }
`;