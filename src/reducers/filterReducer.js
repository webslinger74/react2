import reducerLookUpFunction from './reducerLookUpFunction';
import { CATEGORY_FILTER } from '../constants/filtersConstants';

let initialState = {};

const setCategory = (state, payload) => {
        return {
            category:payload.category
        }
}

export default reducerLookUpFunction(initialState, {
    [CATEGORY_FILTER]: setCategory
})