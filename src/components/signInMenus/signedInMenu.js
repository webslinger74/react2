import React from 'react'
import {Menu, Image, Dropdown} from 'semantic-ui-react';



const SignedInMenu = ({signOutUser, auth, logout, profile}) => {
  return (
  
    <Menu.Item position="right">
   { typeof profile.displayPicture === "string" ? <Image avatar style={{marginTop:'10px', minHeight:'40px', minWidth:'40px'}} spaced="right" src={profile.displayPicture} />:
    <Image avatar spaced="right" src="assets/user.png" />}
    <Dropdown pointing="top left" text={profile.displayName}>
      <Dropdown.Menu>
        <Dropdown.Item text="Add Product" icon="plus" />
        <Dropdown.Item text="Delete Product" icon="minus" />
        <Dropdown.Item text="Edit Product" icon="users" />
        <Dropdown.Item text="My Shop" icon="cart" />
        <Dropdown.Item text="Settings" icon="settings" />
        <Dropdown.Item text="Sign Out" icon="power" onClick={logout} />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Item>
  
 )
}

export default SignedInMenu
  
  
  