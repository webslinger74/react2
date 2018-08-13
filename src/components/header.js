import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { Button, GridColumn, Divider, Segment } from 'semantic-ui-react';
import { modalOpen } from '../features/modals/modalActions';
import { connect } from 'react-redux';
import SignedInMenu from './signInMenus/signedInMenu';
import SignedOutMenu from './signInMenus/SignedOutMenu';
import  { signOutUser } from '../features/auth/authActions';
import { Grid } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const actions = {
    modalOpen,
    signOutUser
}

const mapState =  (state) => {
   return {
        auth: state.firebase.auth,
        profile:state.firebase.profile
   }
}

 


const Header = ({ modalOpen, auth, signOutUser, firebase, profile }) => (
    <div>  
    <Grid>
    <Grid.Column width={6} className="brandheader">
    <h4 className="header__header"> <FontAwesomeIcon icon="shopping-bag" color="yellow"/>Music Review.com</h4>
    </Grid.Column>
    <Grid.Column width={10} className="brandheader">
     {auth.isLoaded && !auth.isEmpty ?
             <SignedInMenu logout={firebase.logout} auth={auth} profile={profile} signOutUser={signOutUser}/> : <SignedOutMenu auth={auth} modalOpen={modalOpen}/>}
      </Grid.Column> 

      </Grid>

        <Grid className="headerGrid">
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/' activeClassName='is-active' exact className='NavTitle'>HOME</NavLink>
        </Grid.Column>
       
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/products' activeClassName='is-active'className='NavTitle'>PRODUCTS</NavLink>
        </Grid.Column>
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/cart' activeClassName='is-active' className='NavTitle'>CART</NavLink>
        </Grid.Column>
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/profile' activeClassName='is-active' className='NavTitle'>PROFILE</NavLink>
        </Grid.Column>
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/music' activeClassName='is-active' className='NavTitle'>MUSIC</NavLink>
        </Grid.Column>
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/gigs' activeClassName='is-active' className='NavTitle'>GIG's</NavLink>
        </Grid.Column>
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/chat' activeClassName='is-active' className='NavTitle'>CHAT</NavLink>
        </Grid.Column>
        <Grid.Column width={2} className="headerGridCol">
        <NavLink to='/admin' activeClassName='is-active' className='NavTitle'>ADMIN</NavLink>
        </Grid.Column>
       
        </Grid> 
         </div>  
      
)

export default withRouter(withFirebase(connect(mapState, actions)(Header)));