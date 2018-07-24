import React from 'react'
import { Component } from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'


    export const ModalScrollingExample = props => {
    console.log("these are props", props)
    return (

            <div>
                <Modal
                trigger={<Button  onClick={props.handleOpen}>Submit</Button>}
                open={props.open}
                basic size='small'
                onClose={props.handleClose}
                >

                <Modal.Header>Profile Picture</Modal.Header>

                <Modal.Content image>                
                <Image wrapped size='medium' src='/images/Categories/Icons/avatar.png'/>
                    <Modal.Description>
                        <Header>Default Profile</Header>

                        <p>
                           <h1>{props.info.firstName}</h1>
                           <h1>{props.info.lastName}</h1>
                           <h1>{props.info.bio}</h1>

                        </p>

                        <p><h1>{props.info.art}</h1></p>
                    </Modal.Description>
{/* 
                    <Image wrapped size='medium' src='/images/Categories/Icons/avatar.png' />

                    <Modal.Description>

                    <Header>Modal Header</Header>

                    

                    </Modal.Description> */}

                </Modal.Content>

                <Modal.Actions>
                      <Button color='green' onClick={props.handleClose} inverted
                      >
                        <Icon name='checkmark' /> Edit
                    </Button>
                </Modal.Actions>

                </Modal>
          </div>
    )
    }