import React, {Component} from 'react';
import { Item, Image, Button, Segment, Form, Grid} from 'semantic-ui-react';
import ProductItem from './ProductItem';
import {withRouter, Link} from 'react-router-dom';
import {connect}from 'react-redux';
import {getProductDetails} from '../features/products/addProductAction';
import ProductDetailReview from './ProductDetailReview';
import { addProductComment, getProductComments } from '../features/products/addProductAction';
import ProductDetailReviewSummary from './ProductDetailReviewSummary';

const  actions = {
  getProductDetails,
  addProductComment,
  getProductComments
}

const mapState = (state) => {
  return {
  userId:state.firebase.auth.uid
}
}

class ProductDetail extends Component {

    constructor(props){
      super(props)
    }

    state = {
      indProduct:{}
    }
   
   async componentDidMount() {
     try {
      let indProduct = await this.props.getProductDetails(this.props.match.params.id);
      this.setState({
       indProduct:indProduct
      })
    } catch (error){
      console.log(error);
    }
  }

  submitComment = (values) => {
    console.log(values);
  }

  render(){

   

  return (
    <div>
    <Segment className="proDetails">
    <div>
    <Item>
    <Item.Content>
      <Item.Header style={{marginBottom:"40px", fontSize:'40px', fontWeight:'bold'}}>{this.state.indProduct && this.state.indProduct.title}</Item.Header>
    

        <Image src={this.state.indProduct && this.state.indProduct.downloadpic} style={{maxHeight:'420px', Width:'40rem'}} />
     
      
    </Item.Content>
  </Item>
  </div>
  <div>
  <Item.Extra style={{fontSize:'20px', fontWeight:'bold'}}>{this.state.indProduct && this.state.indProduct.description}</Item.Extra>
  <Item.Meta  style={{fontSize:'25px', fontWeight:'bold'}}>£{this.state.indProduct && this.state.indProduct.price}</Item.Meta>
  <Button color='teal'><Link to='/products'>Go Back to Full View</Link></Button>
  <Button color='teal'>Add To Cart</Button>
    <ProductDetailReview userId={this.props.userId}  prodId={this.props.match.params.id} addProductComment={this.props.addProductComment} prodState={this.state.indProduct}/>
   
  </div>
  </Segment>
  

 <Grid>
       <Grid.Column width={16} className="mainProdDash">   
                       
           <ProductDetailReviewSummary  prodId={this.props.match.params.id} addProductComment={this.props.addProductComment} prodState={this.state.indProduct} />
    </Grid.Column>
    </Grid>



    </div>
  )
}
}

export default withRouter(connect(mapState,actions)(ProductDetail));
