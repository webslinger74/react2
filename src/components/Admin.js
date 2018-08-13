import React from 'react';
import { Grid } from 'semantic-ui-react';
import  ProductInputForm  from './productInputForm';




const AdminProds = () => {
  
    return  (    
    <Grid>

    <Grid.Column width={4}>   
    <div className="backgrounds">
    <h1>Add Product</h1>
    <h1>Edit Product</h1>   
    <h1>Delete Product</h1> 
    </div>
    </Grid.Column>
         <Grid.Column width={12}>   
    <div className="backgrounds">
    <h1>Add Product</h1>
           <ProductInputForm />
         
    </div>
    </Grid.Column>
    </Grid>
)
    }

export default AdminProds;