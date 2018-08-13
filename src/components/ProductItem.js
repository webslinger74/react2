import React from 'react'
import { Item, Image, Button} from 'semantic-ui-react';



const ProductItem = ({product}) => {
  return (
    <div>
    <Item>
    <Item.Image size='tiny'/>
    <Item.Content>
      <Item.Header style={{fontSize:'15px', fontWeight:'bold'}}>{product.title}</Item.Header>
      <Item.Meta>£{product.price}</Item.Meta>
      <Item.Description>
        <Image src={product.downloadpic} style={{maxHeight:'120px', Width:'10rem'}} />
        {product.description}
      </Item.Description>
      <Item.Extra>{product.title}</Item.Extra>
      <Button color='teal'>Add To Cart</Button>
    </Item.Content>
  </Item>

    </div>
  )
}

export default ProductItem;
