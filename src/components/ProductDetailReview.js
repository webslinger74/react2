import React from 'react';
import { Grid, Item, Form, Button,Segment,Image, Header, Divider, Menu } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../utils/TextArea';

const ProductDetailReview = ({handleSubmit, addProductComment, userId, prodId, prodState}) => (       
    <div>
    <Grid>
    <Grid.Column width={12}>   
    
    <h1>Review Product</h1>
    <Form onSubmit={handleSubmit((values) => addProductComment(values, prodId, userId))}>
    <Field
    name="review"
    component={TextArea}
    type="text"
    placeholder="add review"
  />
  <Button fluid size="large" color="teal">
  Add Review
</Button>
    </Form>
    </Grid.Column>
 
 </Grid>
    </div>
);

export default reduxForm({form:'chatInputForm'})(ProductDetailReview);