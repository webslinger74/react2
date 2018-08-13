import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Item, Segment,Image, Header, Divider, Menu, Button } from 'semantic-ui-react';
import ProfileImgUpdate from '../features/ProfileImprovements/profileImp';
import {getPhotoFromStorage} from '../features/products/addProductAction';
import { firestoreConnect } from 'react-redux-firebase';
import {followOrUnfollow} from '../features/users/userActions';





const mapState = (state) => ({
    displayPic:state.firebase.profile.displayPicture,
    usersDisplayName:state.firestore.data.users,
    currentUser:state.firebase.auth.uid
});

const actions = {
  getPhotoFromStorage,
  followOrUnfollow
}

class ViewOtherProfile extends Component {
     constructor(props){
             super(props)
     }

    state = {
      IndivPhoto: "",
      theValues: "",
      followStatus:false
    }

  async componentDidMount() {
    try {
          let IndivPhoto = await this.props.getPhotoFromStorage(this.props.match.params.id);
          console.log(IndivPhoto);
      

     const theValues = await this.getDisplayNames();

     this.setState({
      IndivPhoto:IndivPhoto,
      theValues:theValues

   })
   console.log(this.state.theValues[0][1].displayName, "this is the state in profiles");
     
    } catch (error){
     console.log(error);
   }
  }

  componentWillMount(){
    let subCollectionId = this.props.match.params.id;
    console.log(subCollectionId, "this is the sub collId"); //this is the one trying to follow could use currentuser for id of us
    return subCollectionId;
  }

  getDisplayNames = () => {
    let arrValues = Object.entries(this.props.usersDisplayName);
      console.log(arrValues, "the arr super vals")
      let vals = arrValues.filter((val) => {
          console.log(val[0]);
          console.log(this.props.match.params.id);
          if(val[0] === this.props.match.params.id)
          {
            return val[0];
          }
       })
       console.log(vals, "this is the super vals");
       return vals;

       }
      
      /* followOrUnfollow = () => async (dispatch, getState, {getFireStore}) =>  {
        let arrVals = Object.entries(this.props.usersDisplayName);
        let currentUser = arrVals[0];
        let toFollowUser = arrVals[1];
         console.log(arrVals, "this is arr vals"); 
        const firestore = getFireStore();
        const following = {
          photoURL: toFollowUser.photoURL || 'assets/user.png',
          displayName:toFollowUser.displayName || 'Unknown'
        };
        console.log(currentUser, "this is the cur user in followfunction");
        console.log(toFollowUser, "this is the user id of the user we have clicked on photo")
        try {
          await firestore.set({
            collection: 'users',
            doc: currentUser[0],
            subcollections:  [{collection:'following', doc:this.props.match.params.id}]
          }, following );
        } catch (error) {
          console.log(error);
        }
      }
  
*/
             

 

  render() {

      return (       
        <div id="getWork">
        <Grid>
       
     <Grid.Column width={16}>   
     <div className="backgrounds">
     <Segment className="rightMargin">
   
   
    
    
    <Button onClick={() =>  this.props.followOrUnfollow(this.props.usersDisplayName, this.props.match.params.id, this.state.followStatus)}>{this.state.followStatus ? "UnFollow" : "Follow Me" }</Button>
    <Divider />
    <Grid.Column width={4} style={{paddingLeft:'0px'}}>
    <h2>
    {this.state.theValues !== "" ? this.state.theValues[0][1].displayName : "steven"}</h2>
    {this.state.IndivPhoto && typeof this.state.IndivPhoto === "string" ? <Image style={{marginTop:'10px', maxHeight:'200px', maxWidth:'200px'}} spaced="right" src={this.state.IndivPhoto} />:
    <Image avatar spaced="right" src="assets/user.png" />}
    <Grid.Row />
    <Divider />
    <h2>Following</h2>
    <Divider />
    <h2>Followers</h2>
    
    </Grid.Column>
     </Segment>
         </div>
     </Grid.Column>
    
     </Grid>
        </div>
    
  
    
 
)
}
}
export default connect(mapState, actions)(firestoreConnect([{collection:'users', doc:"eQOrCxUcGTXlMmgrQ4VY0TKfri83", subcollections: [{ collection: 'followers' }]}]) (ViewOtherProfile));