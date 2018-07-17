import React from 'react'
import TestModal from './TestModal';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';


const mapState = (state) => {
    return {
        currentModal:state.Modals
    }
}

const modalLookup = {
    TestModal,
    LoginModal,
    RegisterModal
}


const ModalManager = ({currentModal}) => {
    let renderedModal;
    if (currentModal){
        const {modalType, modalProps} = currentModal;
        const ModalComponant = modalLookup[modalType];
        renderedModal = <ModalComponant {...modalProps}/>
    } 
        return <span>{renderedModal}</span>
}

export default connect(mapState)(ModalManager);
