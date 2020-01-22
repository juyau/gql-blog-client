import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  Grid,
  Image,
  Card,
  Loader,
  Button,
  Icon,
  Label,
  Message,
  Popup
} from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CommentForm from "../components/CommentForm";

const SinglePost = props => {
  const { user } = useContext(AuthContext);
  const pID = props.match.params.postId;

  const deleptePostCallback = () => {
    props.history.push("/");
  };

  let postMarkup = <p> Loading...</p>;

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId: pID },
    onError(err) {
      console.log(err.graphQLErrors[0].message);
    }
  });

  if (loading) {
    postMarkup = <Loader size="large" />;
  }
  if (error) {
    // console.log(error);
    postMarkup = (
      <Message warning>
        <Icon name="warning circle" />
        Errors:
        <ul>{error.graphQLErrors[0].message}</ul>
      </Message>
    );
  }

  if (data) {
    const {
      id,
      body,
      title,
      username,
      createdAt,
      comments,
      commentCount,
      likeCount,
      likes
    } = data.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="left"
              size="large"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <h5>{title}</h5>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Popup
                  content="Comments"
                  trigger={
                    <Button as="div" labelPosition="right">
                      {user ? (
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                      ) : (
                        <Button as={Link} to="/login" basic color="blue">
                          <Icon name="comments" />
                        </Button>
                      )}
                      <Label basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  }
                />

                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deleptePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && <CommentForm postId={pID} />}
            {comments.map(comment => {
              return (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <h5>{comment.title}</h5>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      body
      username
      createdAt
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

export default SinglePost;
