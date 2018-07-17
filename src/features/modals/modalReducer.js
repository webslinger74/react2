import {MODAL_OPEN, MODAL_CLOSE} from './modalConstants';
import  reducerLookUpFunction from '../../reducers/reducerLookUpFunction';


const initialState = null;

export const openModal = (state, payload) => {
        return {
            modalType:payload.modalType,
            modalProps:payload.modalProps
        }
}


export const closeModal = (state) => {
    return null
} 



export default reducerLookUpFunction(initialState, {
    [MODAL_OPEN]: openModal,
    [MODAL_CLOSE]: closeModal
});
