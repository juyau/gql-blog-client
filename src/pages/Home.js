import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";

const GET_POSTS = gql`
  {
    getPosts {
      id
      username
      title
      body
      createdAt
      likeCount
      commentCount
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (error) return <p>Error :(</p>;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
