import { createStore, combineReducers } from 'redux';



const Product = {
    name: 'race-car',
    price: '2000.00',
    description:'fast car for the main man',
    category:'sport'
}

const Area = {
    shop:'',
    location:'Bolton',
    size:''
}



const store = createStore(
    combineReducers({
        Products: productReducer,
        Area: areaReducer  
    })
)



export default store;

