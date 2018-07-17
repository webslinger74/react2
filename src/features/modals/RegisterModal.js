import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {modalClose} from './modalActions';
import RegisterForm from '../auth/RegisterForm';

const actions = {modalClose};

class RegisterModal extends Component {
    render() {
        return (
            <Modal
                size='mini'
                open={true}
                onClose={this.props.modalClose}
            >
                <Modal.Header>
                    Register to Web App!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <RegisterForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default connect(null, actions)(RegisterModal);