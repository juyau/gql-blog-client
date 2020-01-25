import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Label, Icon, Popup } from "semantic-ui-react";

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [isLiked, setIsLiked] = useState(
    user && likes.find(like => like.username === user.username)
  );
  const [newLikeCount, setNewLikeCount] = useState(likeCount);

  //   useEffect(() => {
  //     if (user && likes.find(like => like.username === user.username)) {
  //       setIsLiked(true);
  //     } else {
  //       setIsLiked(false);
  //     }
  //   }, [user, likes]);

  const [likePost, { loading, error }] = useMutation(LIKE_POST, {
    update(proxy, result) {
      console.log(result.data.likePost);
      setNewLikeCount(result.data.likePost.likeCount);
      if (
        result.data.likePost.likes.find(like => like.username === user.username)
      ) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    },

    variables: { postId: id }
  });

  const buttonMarkup = user ? (
    isLiked ? (
      <Button color="teal" size="mini">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic size="mini">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login" size="mini">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      content={isLiked ? "Unlike" : "Like"}
      trigger={
        <Button
          loading={loading ? true : false}
          as="div"
          size="mini"
          labelPosition="right"
          onClick={user ? likePost : null}
        >
          {error && console.log(error)}
          {buttonMarkup}
          <Label basic color="teal" pointing="left" size="mini">
            {newLikeCount}
          </Label>
        </Button>
      }
    />
  );
};

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        createdAt
        username
        id
      }
    }
  }
`;

export default LikeButton;
