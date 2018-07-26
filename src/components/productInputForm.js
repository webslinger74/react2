import React, {Component} from 'react';
import { Form, Segment, Button, Label} from 'semantic-ui-react';
import { Field, reduxForm, FieldArray, reset} from 'redux-form';
import TextInput from '../utils/TextInput';
import { connect } from 'react-redux';
import { addProduct } from '../features/products/addProductAction';
import PhotosPage from './ProductPhoto';


const actions = {
    addProduct
}


const afterSubmit = (result, dispatch) =>
  dispatch(reset('productInputForm'));




class ProductInputForm extends Component {
      constructor(props) {
        super(props);
      }

      state = {
        blob:{}
      };

  getBlobImage = (blob) => {
    console.log(blob, "this is the blob passed up to input form!")
    this.setState({
      blob
    });
    return blob;
  }
  

  render(){


  return (
    <div>
    <Form size="large" className="rightMargin" onSubmit={this.props.handleSubmit((values) =>{this.props.addProduct(values, this.state.blob)})}>
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

      <PhotosPage blobImage={this.getBlobImage}/>
  
      {this.props.error && <Label>{this.props.error}</Label>}
      <Button fluid size="large" color="teal">
        Add Product
      </Button>
    </Segment>
  </Form>

      <div></div>
    </div>
  )
}
}

export default connect(null, actions)(reduxForm({form:'productInputForm', onSubmitSuccess: afterSubmit, })(ProductInputForm));
