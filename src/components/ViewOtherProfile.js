import React, {Component} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid, Item, Segment,Image, Header, Divider, Menu, Button } from 'semantic-ui-react';
import ProfileImgUpdate from '../features/ProfileImprovements/profileImp';
import {getPhotoFromStorage} from '../features/products/addProductAction';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import {follow, checkFollow, unfollow} from '../features/users/userActions';
import ProfileCard from './ProfileCard';




const query = ({ auth, match, currentUser }) => {
  return [
    {
      collection:'users',
      doc:match.params.id,
      subcollections: [{ collection: 'followers', doc:currentUser}],
      storeAs: 'individualFollow'
    },
    {
      collection:'users',
      doc:match.params.id,
      subcollections: [{ collection: 'following'}],
      storeAs: 'following'
    },
    {
      collection:'users',
      doc:match.params.id,
      subcollections: [{collection:'followers'}],
      storeAs: 'followers'
    }
  ]
};







const mapState = (state) => ({
    displayPic:state.firebase.profile.displayPicture,
    followings:state.firestore.ordered.following,
    followers:state.firestore.ordered.followers,
    indFollow:state.firestore.ordered.individualFollow,
    usersDisplayName:state.firestore.data.users,
    currentUser:state.firebase.auth.uid,
    auth:state.firebase.auth
});

const actions = {
  getPhotoFromStorage,
  follow,
  checkFollow,
  unfollow
}

class ViewOtherProfile extends Component {
     constructor(props){
             super(props)
     }

    state = {
      IndivPhoto: "",
      theValues: ""
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
      
              


  render() {
      const isFollowing =  !isEmpty(this.props.indFollow);
      return (       
        <div id="getWork">
        <Grid>
       
     <Grid.Column width={16}>   
     <div className="backgrounds">
     <Segment className="rightMargin">
   
   
    
    {isFollowing ?
      <Button onClick={() => this.props.unfollow(this.props.currentUser,this.props.match.params.id)}>  Unfollow Me </Button> :
    <Button onClick={() => this.props.follow(this.props.usersDisplayName, this.props.match.params.id)}>
           Follow Me
    </Button>}
    <Divider />
    <Grid.Column width={4} style={{paddingLeft:'0px'}}>
    <h2>User-Profile of -- 
    {this.state.theValues !== "" ? this.state.theValues[0][1].displayName : "unknown"}</h2>
    {this.state.IndivPhoto && typeof this.state.IndivPhoto === "string" ? <Image style={{marginTop:'10px', maxHeight:'300px', maxWidth:'300px'}} spaced="right" src={this.state.IndivPhoto} />:
    <Image avatar spaced="right" src="assets/user.png" />}
    <Grid.Row />
    <Divider />
    <h2>Following</h2>
    
      <div className="profileCards">
            {this.props.followings && 
            this.props.followings.map(following => <div key={following.id}><ProfileCard key={following.id} user={following} /></div>)}
                  </div>
    <Divider />
    <h2>Followers</h2>
    <div className="profileCards">
    {this.props.followers && 
      this.props.followers.map(follower =><div key={follower.id}> <ProfileCard key={follower.id} user={follower} /></div>)}    
    </div>
    <Divider />
    </Grid.Column>
     </Segment>
         </div>
     </Grid.Column>
    
     </Grid>
        </div>
    
  
    
 
)
}
}
export default compose(connect(mapState, actions),
               firestoreConnect(props => query(props)))(ViewOtherProfile);