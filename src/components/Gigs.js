import React from 'react';
import { connect } from 'react-redux';
import { Grid, Item, Segment,Image, Header, Divider, Menu } from 'semantic-ui-react';
import ProfileImgUpdate from '../features/ProfileImprovements/profileImp';


const mapState = (state) => ({
    displayPic:state.firebase.profile.displayPicture,
    displayName:state.firebase.profile.displayName
});

const Gigs = ({displayPic, displayName}) => (       
    <div id="getWork">
    <Grid>
    <Grid.Column width={12}>   
     <Item.Group className="backgrounds">
     <Segment className="rightMargin">
     <h1> Gig Reviews </h1>
     <Divider />
      </Segment>
     </Item.Group>
    </Grid.Column>


 <Grid.Column width={4}>   
 <div className="backgrounds">
 <Segment className="rightMargin">
<h1> {displayName} </h1>
<Divider />
<Grid.Column width={4} style={{paddingLeft:'0px'}}>
{displayPic && typeof displayPic === "string" ? <Image style={{marginTop:'10px', minHeight:'200px', minWidth:'200px'}} spaced="right" src={displayPic} />:
<Image avatar spaced="right" src="assets/user.png" />}
<Grid.Row />

</Grid.Column>
 </Segment>
 <Segment className="rightMargin">
<h1> Gigs </h1>
<Divider />
<Grid.Column width={4} style={{paddingLeft:'0px'}}>
<Menu vertical >
  <Header icon="user" attached inverted color="grey" content="Gig Reviews" />
  <Menu.Item>Reviewed</Menu.Item>
  <Menu.Item>Going to</Menu.Item>
  <Menu.Item>Favourite</Menu.Item>
</Menu>
<Grid.Row />
<Menu vertical>
  <Header
    icon="settings"
    attached
    inverted
    color="grey"
    content="Account"
  />
  <Menu.Item>My Account</Menu.Item>
</Menu>
</Grid.Column>
 </Segment>
 </div>
 </Grid.Column>

 </Grid>
    </div>
);

export default connect(mapState)(Gigs);