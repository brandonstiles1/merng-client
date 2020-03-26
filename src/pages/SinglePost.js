import React, { useContext } from 'react';
import gql from 'graphql-tag';
import moment from 'moment'; 
import { Grid, Card, Image, Button, Icon, Label } from 'semantic-ui-react';

// Context
import { AuthContext } from '../context/auth';

// Hooks
import { useQuery } from '@apollo/react-hooks';

// Components
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';


function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log(postId);

  const { 
    loading,
    error,
    data
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });
  
  function deletePostCallback () {
    props.history.push('/');
  }

  if (loading) return <p>Loading post...</p>
  if (error) return <p>Error</p>
 
  let postMarkup;
  if (!data.getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const { 
      id, 
      body, 
      createdAt, 
      username, 
      comments, 
      likes, 
      likeCount, 
      commentCount 
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row> 
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              size='small'
              float='right'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{ username }</Card.Header>
                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                <Card.Description>{ body }</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={ user } post={ { id, likeCount, likes } } />
                <Button
                  as='div'
                  labelPositin='right'
                  onClick={ () => console.log('Comment on post') }
                >
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    { commentCount }
                  </Label>
                </Button>
                { user && user.username === username && (
                  <DeleteButton postId={ id } callback={ deletePostCallback } />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!){
    getPost(postId: $postId){
      id
      body
      createdAt
      username
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`

export default SinglePost;