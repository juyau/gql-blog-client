import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Card, Icon, Label, Button, Image, Popup } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({
  post: { id, title, username, body, createdAt, likes, likeCount, commentCount }
}) {
  const { user } = useContext(AuthContext);

  const commentPost = () => {
    console.log("comment on post.");
  };
  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{title}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likeCount, likes }} />
        <Popup
          content="Comments"
          trigger={
            <Button
              as={Link}
              to={user ? `/posts/${id}` : "/login"}
              labelPosition="right"
              onClick={commentPost}
            >
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
