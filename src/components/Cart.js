import React from 'react';
import { connect } from 'react-redux';
import { Grid, Item } from 'semantic-ui-react';



const mapState = (state) => ({
    
});

const Cart = () => (       
    <div id="getWork">
    <Grid>
    <Grid.Column width={4}>   
     <Item.Group className="backgrounds">
        <h1>Cart Items</h1>
     </Item.Group>
    </Grid.Column>


 <Grid.Column width={12}>   
 <div className="backgrounds">
 <h1>Add to Cart</h1>
        
      


 </div>
 </Grid.Column>
 </Grid>
    </div>
);

export default connect(mapState)(Cart);