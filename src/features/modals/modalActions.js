import {MODAL_OPEN, MODAL_CLOSE} from './modalConstants';

export const modalOpen = (modalType, modalProps) => {
    return {
        type:MODAL_OPEN,
        payload:{
            modalType,
            modalProps

        }
    }
}


export const modalClose = () => {
    return {
        type: MODAL_CLOSE
    }
}