import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import LoginForm from '../auth/LoginForm';
import {modalClose} from "./modalActions";

const actions = {modalClose};

class LoginModal extends Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.modalClose}
            >
                <Modal.Header>
                    Login to Web App!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(LoginModal);