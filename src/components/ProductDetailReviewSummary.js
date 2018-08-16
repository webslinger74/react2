import React, {Component} from 'react';
import { Grid, Item, Form, Button,Segment,Image, Header, Divider, Menu } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../utils/TextArea';
import {connect} from 'react-redux';
import { getProductComments, getPhotoFromStorage, removeComment, calcProductRating } from '../features/products/addProductAction';
import {Link} from 'react-router-dom';

const actions = {
    getProductComments,
    getPhotoFromStorage,
    removeComment,
    calcProductRating
}
const mapState = (state) => {
    return {
    userId:state.firebase.auth.uid,
    displayPicture:state.firebase.profile.displayPicture
}
}


class ProductDetailReviewSummary extends Component { 
    constructor(props){
        super(props)
      }
    
    

    state = {
                comments:[]
            }

        async componentDidMount() {
            try {

                let prodrat = await this.props.calcProductRating(this.props.prodId);
                    console.log(prodrat);


                let indComments = [];
             indComments = await this.props.getProductComments(this.props.prodId);
             console.log(indComments, "comments for prod");
             indComments.on('value', (snapshot) => {
                const items = snapshot.val();
                console.log(items, "this is the items here!");
                if(items !== null){
                const snapArrKeys = Object.keys(items);
                console.log(snapArrKeys, "this is the keys????");
                const snapArr = Object.values(items);
                const arrKeyVal = Object.entries(items);
                console.log(arrKeyVal, "this is key val pairs");
               this.setState({
               comments:snapArr,
               commentKeys:snapArrKeys,
               items:items,
               KeyVals:arrKeyVal
             })}
            })
        
           } catch (error){
             console.log(error);
           }
         }

         



    render(){ 
        const {handleSubmit, addProductComment,getPhotoFromStorage,removeComment, prodId, userId, displayPicture, prodState} = this.props;
        return (
    
    <div>
    <Grid>
    <Grid.Column width={16}>   
    
    <h1>Reviews</h1>
    <div className="comments">

     {this.state.KeyVals && this.state.KeyVals.map((comment) => {
                const commentKey = comment[0];
                console.log(commentKey, "keys");
                const commentVal = comment[1];
                console.log(commentVal, "vals");

                return  <div key={commentKey}>
                <Segment><div className="comments">
                           
                         <div><span><Link to={`/profile/${commentVal.userId}`}><Image style={{fontsize:'8px', maxHeight:'50px', maxWidth:'50px', borderRadius:'50%'}} src={commentVal.downloadableImg}/></Link><h2>{commentVal.displayName}</h2></span></div>
                         <div><h2>{commentVal.values.review}</h2></div>
                         <div><h2>{commentVal.values.rating}/10</h2></div>
                         <Button disabled={commentVal.userId !== this.props.userId} onClick={() => removeComment(prodId, commentKey)}>x</Button>
                        
                       </div>
                       </Segment>
                       </div>

            })
     }       

    </div>  

    </Grid.Column>
 
    </Grid>
       </div>

    )}

    }


export default connect(mapState,actions)(reduxForm({form:'chatInputForm'})(ProductDetailReviewSummary));