import React from 'react';
import { connect } from 'react-redux';




const mapState = (state) => ({
    products: state.Product,
    area: state.Area
});

const HomePage = ({ products, area }) => (       
    <div>
    <h1>Home Page</h1>
    <h1> {products.name}</h1>
    <h1> {area.location}</h1>
    </div>
);

export default connect(mapState)(HomePage);