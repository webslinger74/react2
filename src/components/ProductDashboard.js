import React, {Component} from 'react';
import { connect } from 'react-redux';
import ProductItem from './ProductItem';
import { Grid, Image, Item, Segment, Divider, Button } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import  ProductInputForm  from './productInputForm';
import PhotoPage from './ProductPhoto';
import { addProduct, getProductForDashboard, getPrevProductForDashboard } from '../features/products/addProductAction';

const mapState = (state) => {
    return {
        products: state.firestore.ordered.products,
        filteredProds:state.Products
} 
}
const actions = {
    getProductForDashboard,
    getPrevProductForDashboard

}


class Products extends Component {
    constructor(props){
        super(props)
    }

    async componentDidMount() {
        let next = await this.props.getProductForDashboard();
        console.log(next);

           }

    getNextProducts = async () => {
        const { filteredProds } = this.props;
        let lastProduct = filteredProds && filteredProds[0][filteredProds[0].length -1];
        console.log(lastProduct, "this is the lastproduct from state");
        let next = await this.props.getProductForDashboard(lastProduct);
        console.log(next); 
           }

    getPreviousProducts = async () => {
        const { filteredProds } = this.props;
        let lastProductTitle = filteredProds && filteredProds[0][0].title;
        console.log(lastProductTitle, "this is the lastproduct from state");
        
        let next = await this.props.getPrevProductForDashboard(lastProductTitle);
        console.log(next); 
       
    }





    render(){
    return  (    
    <Grid>
       <Grid.Column width={4}>   
        <Item.Group className="backgrounds">
        <h1>Products for Sale</h1>
        <Divider className="rightMargin"/>
           {this.props.products && this.props.products.map((product, index) => (
               <Segment className="rightMargin" key={index}>
                 <ProductItem  key={index} product={product}/>
                 </Segment>
                 
           ))}
   
        </Item.Group>
       </Grid.Column>
   

    <Grid.Column width={12}>   
    <div className="backgrounds">
    <h1>Add Product</h1>
           <ProductInputForm />
           <Button color='teal' onClick={this.getPreviousProducts}>Previous</Button>
           <Button color='teal' style={{float:'right', marginRight:'30px'}} onClick={this.getNextProducts}>Next</Button>
            {this.props.filteredProds[0] && this.props.filteredProds[0].map((prod,index) => (
                <div key={index}>
                <Segment className="rightMargin">
                    <h1>{prod.title}</h1>
                    <h1><img style={{maxHeight:'200px', maxWidth:'200px'}} src={prod.downloadpic}/></h1>
                    <h2>£{prod.price}</h2>
                    <h2>{prod.description}</h2>
                    </Segment>
                <Divider className="rightMargin"/>
                    </div>
            ))}

    </div>
    </Grid.Column>
    </Grid>
)
    }
}
export default connect(mapState, actions)(firestoreConnect([{collection:'products'}])(Products));