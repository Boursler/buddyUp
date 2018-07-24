import React from 'react'

export const Event = props => (


    <Item key={props.eventfullID}>
        <Item.Image src={props.image}/>

        <Item.Content>
            <Item.Header as='a'>{props.title}</Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>
              {props.description}
            </Item.Description>
            <Item.Extra>Address: {props.address}</Item.Extra>
        </Item.Content>
    </Item>
);
