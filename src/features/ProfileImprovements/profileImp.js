
import Dropzone from 'react-dropzone';
import React, {Component, PropTypes} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Icon, Card, Form, FormField} from 'semantic-ui-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {connect} from 'react-redux';
import { addPhoto } from './profileActions';

const actions = {
    addPhoto
}

class ProfileImgUpdate extends Component {
    constructor(props) {
        super(props);
      }
        state = {
            files:[],
            fileName: '',
            image: {},
            cropResult: null
      }



        onDrop = (files) =>  {
            this.setState({
            files,
            fileName: files[0].name,
        
        })
    }

        cropImage = () => {
            if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined'){
                return;
            }
            this.refs.cropper.getCroppedCanvas().toBlob( blob => {
                let imageUrl = URL.createObjectURL(blob);
                    this.setState({
                    cropResult: imageUrl,
                    image:blob
                })
            }, 'image/jpeg');
            console.log(this.state.image, this.state.cropResult, "is it a blob");
          
        }

           
    render() {
    
        return (
            <div>
            <Segment>
                <Header dividing size='large' content='Add Photo' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                    <Dropzone onDrop={this.onDrop} multiple={false}>
                        <div style={{paddingTop:'30px', textAlign:'center'}}>
                        <Icon name='upload' size='huge' />
                        <Header content='Drop image here or click to add' />
                        </div>
                    </Dropzone>


                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                    {this.state.files[0] && 
                        <Cropper 
                        style={{height: 200, width:'100'}}
                        ref='cropper'
                        src={this.state.files[0].preview}
                        aspectRatio={1}
                        viewMode={0}
                        dragMode='move'
                        guides={false}
                        scalable={true}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        crop={this.cropImage}                    
                    />}


                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />

                        {this.state.files[0] &&
                        <Image style={{minHeight:'200px', minWidth: '200px'}} src={this.state.cropResult} />}
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Button onClick={() => this.props.addPhoto(this.state.image)} fluid size="large" color="teal">Update Image</Button>
                </Segment>

                <Segment>

                          <Header dividing size='large' content='Add Address'/>
                            <Grid>
                            
                            <Grid.Column width={12}>
                           
                            </Grid.Column>

                            </Grid>
                
                
                
                
                
                </Segment>
                <Segment>

                <Header dividing size='large' content='Update DisplayName'/>
                  <Grid>
                  
                  <Grid.Column width={16}>

                     <Form>
                          <input placeholder='display name'/>
                          <Button style={{marginTop:'10px'}} fluid size="large" color="teal">Update DisplayName</Button>
                     </Form>



                  </Grid.Column>

                  </Grid>
      
      
      
      
      
      </Segment>
                </div>
        );
    }

}



export default connect(null,actions)(ProfileImgUpdate);