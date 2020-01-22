import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  {
    getPosts {
      id
      username
      title
      body
      createdAt
      likes {
        username
        id
        createdAt
      }
      likeCount
      comments {
        username
        id
        body
        createdAt
      }
      commentCount
    }
  }
`;
