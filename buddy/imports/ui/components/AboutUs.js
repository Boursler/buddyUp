import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const CardExampleGroups = () => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image floated='right' circular size='mini' src='images/Categories/Sepideh.jpg' />
        <Card.Header>Sepideh Falah</Card.Header>
        <Card.Meta>Full-Stack Web Developer</Card.Meta>
        <Card.Description>
          <strong></strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div> */}
      </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='/images/avatar/large/molly.png' />
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          Molly wants to add you to the group <strong>musicians</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>

  </Card.Group>
)

export default CardExampleGroups