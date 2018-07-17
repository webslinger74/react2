import { CATEGORY_FILTER } from '../constants/filtersConstants';

const setCategoryFilter = (category) => {
    return {
        type: CATEGORY_FILTER,
        payload: {
            category: category
        }
    }
}

export default setCategoryFilter;