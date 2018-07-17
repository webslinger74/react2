import { ADD_PRODUCT } from '../constants/productConstants';

const addProduct = (productName, productPrice, productCategory = "hardcore") => {
    return {
        type: ADD_PRODUCT,
    payload: {
        productName: productName,
        productPrice:productPrice,
        productCategory:productCategory
    }}
};


export default addProduct;
