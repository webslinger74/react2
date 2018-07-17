import React from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import { Grid, Image, Item } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import  ProductInputForm  from './productInputForm';


const mapState = (state) => {
    return {
        products: state.firestore.ordered.products
} 
}

const Products = ({ products }) => (    
    <Grid>
       <Grid.Column width={10}>   
        <Item.Group className="backgrounds">
        <h1>Products for Sale</h1>
           {products && products.map((product, index) => (
                 <ProductItem  key={index} product={product}/>
           ))}
   
        </Item.Group>
       </Grid.Column>
   
   
    <Grid.Column width={6}>   
    <div className="backgrounds">
    <h1>Add Product</h1>
           <ProductInputForm />
    </div>
    </Grid.Column>
    </Grid>
)

export default connect(mapState)(firestoreConnect([{collection:'products'}])(Products));