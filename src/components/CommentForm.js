import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Card, Form, Button, Message, Icon } from "semantic-ui-react";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");

  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment
    },
    onError(err) {
      console.log(err);
    }
  });

  return (
    <Card fluid>
      <Card.Content>
        <Card.Meta style={{ marginBottom: 8 }}>Post a comment</Card.Meta>
        <Form onSubmit={createComment}>
          <Form.Input
            placeholder="Say something..."
            onChange={e => setComment(e.target.value)}
            type="text"
            value={comment}
          />
          <Button
            type="submit"
            color="teal"
            size="small"
            disabled={comment.trim() === ""}
            style={{}}
            floated="right"
            loading={loading ? true : false}
          >
            Submit
          </Button>
        </Form>
      </Card.Content>
      {error && (
        <Message warning>
          <Icon name="warning circle" />
          Errors:
          <ul>{error.graphQLErrors[0].message}</ul>
        </Message>
      )}
    </Card>
  );
};

const CREATE_COMMENT = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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

export default CommentForm;
