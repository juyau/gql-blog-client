import React, { useState } from "react";
import { Button, Icon, Confirm, Transition } from "semantic-ui-react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { GET_POSTS } from "../utils/graphql";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const MUTATION = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment, { loading, error }] = useMutation(MUTATION, {
    variables: { postId, commentId },
    update(proxy, result) {
      //   console.log(result.data.deletePost);
      if (!commentId) {
        try {
          const data = proxy.readQuery({
            query: GET_POSTS
          });

          proxy.writeQuery({
            query: GET_POSTS,
            data: {
              getPosts: data.getPosts.filter(p => {
                return p.id !== postId;
              })
            }
          });
        } catch (err) {
          console.log(err);
        }
      }

      setConfirmOpen(false);
      if (callback) {
        callback();
      }
    }
  });

  if (error) {
    console.log(error);
  }

  return (
    <>
      <Button
        basic
        as="div"
        floated="right"
        onClick={() => setConfirmOpen(true)}
        loading={loading ? true : false}
      >
        <Icon name="trash" color="red" style={{ margin: 0 }} />
      </Button>
      <Transition visible={confirmOpen} animation="scale" duration={400}>
        <Confirm
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={deletePostOrComment}
          header="Delete"
          content={
            commentId
              ? "Are you sure to delete the comment?"
              : "Are you sure to delete the post?"
          }
          confirmButton="Delete"
        />
      </Transition>
    </>
  );
};

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
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

export default DeleteButton;
