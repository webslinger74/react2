import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/styles.scss';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';
import Header from  './components/Header';
import PageNotFound from './components/PageNotFound';
import { Provider } from 'react-redux';
import { configureStore } from './store/configure';
import addProduct from './actions/createProduct';
import setCategoryFilter from './actions/filterActions';
import Products from './components/ProductDashboard';
import HomePage from './components/HomePage';
import ModalManager from './features/modals/ModalManager';
import { Container } from '../node_modules/semantic-ui-react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Footer from './components/footer';

library.add(faCoffee, faShoppingBag);






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

const storeState = configureStore();
console.log(storeState);
console.log(storeState.getState());
storeState.dispatch(addProduct('i-pads', '299.99',"electronics"));
storeState.dispatch(addProduct('mobiles', '399.99'));
storeState.dispatch(setCategoryFilter("electronics"));



console.log(storeState.getState());



class App extends Component {
    render() {
        return (
    <div className="background">
        <ModalManager />
        <Switch>
        <Route path='/' exact component={HomePage} />
        </Switch>

        <Route path='/(.+)'
        render={() => (
       <div>
        <Header />
        <Container className="main">
     <Switch>
        <Route path='/products' component={Products}/>
        <Route path='/product/:id' component={Product}/>
        <Route path='/cart' component={Cart}/>
        <Route component={PageNotFound}/>
     </Switch>
     </Container>
         <Footer />
    </div>
        )}
        />
        </div>
    );
}
} 


const Jsx = (
        <BrowserRouter>
        <Provider store={storeState}>
        <div>
            <ReduxToastr
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
            />
                <App />
                </div>
        </Provider>
        </BrowserRouter>
)


let render = () =>
 {ReactDom.render(Jsx, document.getElementById('app'));
};



render();


