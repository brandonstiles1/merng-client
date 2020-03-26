import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

// Components
import LikeButton from './LikeButton';

// Context
import { AuthContext } from '../context/auth';

function PostCard ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}){
  const { user } = useContext( AuthContext );

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{ username }</Card.Header>
        <Card.Meta as={ Link } to={ `/post/${id}}` }>{ moment( createdAt ).fromNow( true ) }</Card.Meta>
        <Card.Description>
          { body }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{id, likes, likeCount}} />
        <Button as='div' labelPosition='right'>
          <Button color='blue' basic as={ Link } to={ `/post/${id}` }>
            <Icon name='comments' />
          </Button>
          <Label basic color='blue' pointing='left'>
            { commentCount }
          </Label>
        </Button>
        { user && user.username === username && (
          <Button
            as='div'
            color='red'
            floated='right'
            onClick={ () => console.log( 'Deleted' ) }
          >
            <Icon name='trash' style={{margin: 0}}/>
          </Button>
        ) }
      </Card.Content>
    </Card>
  );
}

export default PostCard;