import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = ()=> (
    <header>
        <h2 className='headerTitle'>React Shop Boiler</h2>
        <NavLink to='/' activeClassName='is-active' exact className='NavTitle'>Home</NavLink>
        <NavLink to='/products' activeClassName='is-active'className='NavTitle'>Products</NavLink>
        <NavLink to='/cart' activeClassName='is-active' className='NavTitle'>Cart</NavLink>
        
    </header>

)

export default Header;