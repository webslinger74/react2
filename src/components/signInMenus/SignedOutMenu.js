import React from 'react';
import {Menu, Button} from 'semantic-ui-react';
import {NavLink, withRouter} from 'react-router-dom';

const SignedOutMenu = ({modalOpen}) => {
  return (
    
    <Menu.Item position="right">
    <span>

  
    <Button id="loginBtn" content='Home'/>
    <Button id="loginBtn"  content='Products' />
    <Button id="loginBtn"  content='Cart'/>
    <Button id="registerBtn" onClick={ () => modalOpen('RegisterModal', {data:'registering'})} color="green" content='Register' /> 
    <Button id="loginBtn" onClick={ () => modalOpen('LoginModal', {data:'logging in'})} content='Login' />
   
        </span>

   </Menu.Item>

  )
}

export default SignedOutMenu
