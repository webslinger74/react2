import React from 'react';
import { Grid, Item, Form, Button,Segment,Image, Header, Divider, Menu } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../utils/TextArea';
import TextInput from '../utils/TextInput';

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
  <Field
  name="rating"
  component={TextInput}
  type="text"
  placeholder="give rating out of 10"
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