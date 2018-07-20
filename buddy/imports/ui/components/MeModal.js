import React from 'react'
import { Component } from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'


    export default class ModalScrollingExample extends Component {

        state = { modalOpen: false }

        handleOpen = () => this.setState({ modalOpen: true })

        handleClose = () => this.setState({ modalOpen: false })

        render() {

            return (
                <Modal 
                trigger={<div onClick={this.handleOpen}>modal</div>} 
                basic size='small'  
                open={this.state.modalOpen}
                onClose={this.handleClose}
                >

                {/* <Modal trigger={<Button>Long Modal</Button>}> */}

                <Modal.Header>Profile Picture</Modal.Header>

                <Modal.Content image>

                    <Image wrapped size='medium' src='/images/wireframe/image.png' />

                    <Modal.Description>

                    <Header>Modal Header</Header>

                    <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>

                    <Image src='/images/wireframe/paragraph.png' />
                    <Image src='/images/wireframe/paragraph.png' />
                    <Image src='/images/wireframe/paragraph.png' />
                    <Image src='/images/wireframe/paragraph.png' />
                    <Image src='/images/wireframe/paragraph.png' />
                    <Image src='/images/wireframe/paragraph.png' />
                    <Image src='/images/wireframe/paragraph.png' />
                    <Image src='/images/wireframe/paragraph.png' />

                    </Modal.Description>

                </Modal.Content>

                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Edit
                    </Button>
                </Modal.Actions>

                </Modal>
            )
    }}