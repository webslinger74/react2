import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import './styles/styles.scss';
import Header from './components/header';
import HomePage from './components/HomePage'
import PageNotFound from './components/PageNotFound';
import { Provider } from 'react-redux';
import store from './store/configure';

const Products = (props) => (       
    <div>
    <h1>Products  {props.ste}</h1>
    </div>
)
const Product = (props) => (       
    <div>
    <h1>Product details  {props.ste}</h1>
    </div>
)
const Cart = (props) => (       
    <div>
    <h1>Shopping Cart  {props.ste}</h1>
    </div>
)

const storeState = store;
console.log(storeState);
console.log(storeState.getState());


const Routes = () => (
    <BrowserRouter>
    <div>
        <Header />
     <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/products' component={Products}/>
        <Route path='/product/:id' component={Product}/>
        <Route path='/cart' component={Cart}/>
        <Route component={PageNotFound}/>
     </Switch>
    </div>
    
    </BrowserRouter>
);


const Jsx = (
        <Provider store={storeState}>
                <Routes />
        </Provider>
)


let render = () =>
 {ReactDom.render(Jsx, document.getElementById('app'));
};



render();


