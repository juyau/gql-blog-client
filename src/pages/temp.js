const { loading, error, data } = useQuery(GET_POSTS);

if (error) return <p>Error</p>;

return (
  <Grid columns={3}>
    <Grid.row>
      <h1>Recent Posts</h1>
    </Grid.row>
    <Grid.Row>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data.getPosts &&
        data.getPosts.map(({ id, username, title }) => (
          <Grid.Column key={id}>
            <p>
              {title} by {username}
            </p>
          </Grid.Column>
        ))
      )}
      ,
    </Grid.Row>
  </Grid>
);
