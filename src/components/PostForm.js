import React, { useState } from "react";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import useForm from "../utils/hooks";
import { GET_POSTS } from "../utils/graphql";

const PostForm = () => {
  const [error, setError] = useState({});

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: "",
    body: ""
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      try {
        const data = proxy.readQuery({
          query: GET_POSTS
        });

        // Bug from Apollo, the following code, get the new data object before calling writeQuery is not working, the home page will no update.
        // need to put it into the data options in the writeQuery call parameters.

        // data.getPosts = [result.data.createPost, ...data.getPosts]
        proxy.writeQuery({
          query: GET_POSTS,
          variables: values,
          data: { getPosts: [result.data.createPost, ...data.getPosts] }
        });
      } catch (err) {
        console.log(err);
      }
      setError({});
      values.body = "";
      values.title = "";
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
      // console.log(err);
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h3>Create a post:</h3>
        <Form.Input
          placeholder="title..."
          name="title"
          onChange={onChange}
          type="text"
          value={values.title}
        />
        <Form.Input
          placeholder="Say something..."
          name="body"
          onChange={onChange}
          type="text"
          value={values.body}
        />
        <Button
          type="submit"
          color="teal"
          size="small"
          disabled={values.body.trim() === "" || values.title.trim() === ""}
          style={{ marginBottom: 20 }}
          loading={loading ? true : false}
        >
          Submit
        </Button>
      </Form>
      <div>
        {Object.keys(error).length > 0 && (
          <Message warning style={{ marginBottom: 20 }}>
            <Icon name="warning circle" />
            Errors:
            <ul>
              <li>{Object.values(error)}</li>
            </ul>
          </Message>
        )}
      </div>
    </>
  );
};

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
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
        username
        id
        createdAt
      }
      likeCount
    }
  }
`;

export default PostForm;
