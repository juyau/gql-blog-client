import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Grid, Form, Button, Message, Icon } from "semantic-ui-react";
import useForm from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Login = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: ""
  };
  const { onChange, onSubmit, values } = useForm(loginUser, initialState);

  const [login, { loading }] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUser() {
    login();
  }

  return (
    // vertical align not working
    <Grid
      container
      centered
      verticalAlign="middle"
      style={{ marginTop: "10%" }}
    >
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Message
          attached
          header="Welcome back!"
          content="Please login to enjoy more functionalities."
        />
        <Form
          onSubmit={onSubmit}
          noValidate
          className={
            loading
              ? "attached fluid segment loading"
              : "attached fluid segment"
          }
        >
          <Form.Input
            placeholder="Username"
            type="text"
            name="username"
            value={values.username}
            onChange={onChange}
            error={errors.username ? true : false}
          />

          <Form.Input
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
            error={errors.password ? true : false}
          />

          <Button type="submit" primary>
            Login
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <Message attached="bottom" warning>
            <Icon name="warning circle" />
            Login Errors:
            <ul>
              {Object.values(errors).map(value => (
                <li key={value}> {value} </li>
              ))}
            </ul>
          </Message>
        )}
        <p style={{ textAlign: "right", marginTop: 20 }}>
          Don't have an account? <a href="/register">Register now.</a>
        </p>
      </Grid.Column>
    </Grid>
  );
};

const LOGIN = gql`
  mutation Register($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
      email
    }
  }
`;

export default Login;
