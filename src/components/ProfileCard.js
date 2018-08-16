import React from 'react'
import { Item, Image, Button, Card, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
 

const ProfileCard = ({ user }) => {
  return (
    <div>
        <Card as={Link} to={'/Profile/${user.id}'} style={{minHeight:'130px', maxHeight:'130px', maxWidth:'100px'}} >
                <Image style={{maxHeight:'100px', maxWidth:'100px'}}src={user.displayPhoto || '/assets/user.png'} />
            <Card.Content textAlign='center'>
            <Card.Header content={user.displayName}/>
            </Card.Content>
            <Card.Meta textAlign='center'>
                
            </Card.Meta>
        </Card>
    </div>
  )
}

export default ProfileCard;
