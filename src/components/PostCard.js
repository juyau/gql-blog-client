import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Card, Icon, Label, Button, Image } from "semantic-ui-react";

function PostCard({
  post: { id, title, username, body, createdAt, likeCount, commentCount }
}) {
  const likePost = () => {
    console.log("Liked button clicked.");
  };

  const commentPost = () => {
    console.log("comment on post.");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description as={Link} to={`/post/${id}`}>
          {title}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentPost}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
