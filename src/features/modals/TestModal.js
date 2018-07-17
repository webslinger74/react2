import React from 'react'
import { Modal } from 'semantic-ui-react';
import { modalClose } from './modalActions';
import { connect } from 'react-redux';


const actions = {
  modalClose
}



const TestModal = ({ modalClose }) => {
  return (
        <Modal closeIcon="close" open={true} onClose={modalClose} >
          <Modal.Header>Test Modal</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Test Modal... nothing to see here</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
  )
}

export default connect(null, actions)(TestModal);

