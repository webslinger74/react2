import reducerLookUpFunction from './reducerLookUpFunction';
import { ADD_PRODUCT, FETCH_PRODUCTS} from '../constants/productConstants';

let initialState = [];

const addProduct = (state, payload) => {
        return [
            ...state,
            payload
        ]
}


const fetchProducts = (state, payload) => {
    return [ 
        payload
    ]
      }

export default reducerLookUpFunction(initialState, {
    [ADD_PRODUCT] : addProduct,
    [FETCH_PRODUCTS]: fetchProducts
})



















