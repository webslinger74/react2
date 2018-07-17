import React from 'react';
import { Form, Segment, Button, Label} from 'semantic-ui-react';
import { Field, reduxForm, reset} from 'redux-form';
import TextInput from '../utils/TextInput';
import { connect } from 'react-redux';
import { addProduct } from '../features/products/addProductAction';

const actions = {
    addProduct
}


const afterSubmit = (result, dispatch) =>
  dispatch(reset('productInputForm'));


const ProductInputForm = ({ addProduct, handleSubmit, error }) => {
  return (
    <div>
    <Form size="large" onSubmit={handleSubmit(addProduct)}>
    <Segment>
      <Field
        name="title"
        component={TextInput}
        type="text"
        placeholder="product title"
      />
      <Field
        name="description"
        component={TextInput}
        type="text"
        placeholder="product description"
      />
      <Field
      name="price"
      component={TextInput}
      type="text"
      placeholder="product price"
    />
      {error && <Label>{error}</Label>}
      <Button fluid size="large" color="teal">
        Add Product
      </Button>
    </Segment>
  </Form>
    </div>
  )
}

export default connect(null, actions)(reduxForm({form:'productInputForm', onSubmitSuccess: afterSubmit, })(ProductInputForm));
