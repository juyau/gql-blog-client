const { loading, error, data } = useQuery(GET_POSTS);

if (error) return <p>Error</p>;

return (

<Message attached="bottom" warning>
          <Icon name="warning circle" />
          Errors:
          <ul>{error}</ul>
        </Message>


      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>

        <Form.field>
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
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.field>
      </Form>
      {error && (
        <Message attached="bottom" warning>
          <Icon name="warning circle" />
          Errors:
          <ul>{error}</ul>
        </Message>
      )}
 