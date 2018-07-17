import React from 'react'
import { Item, Image } from 'semantic-ui-react';



const ProductItem = ({product}) => {
  return (
    <div>
    <Item>
    <Item.Image size='tiny' src='/images/wireframe/image.png' />

    <Item.Content>
      <Item.Header as='a'>{product.company}</Item.Header>
      <Item.Meta>{product.price}</Item.Meta>
      <Item.Description>
        <Image src='/images/wireframe/short-paragraph.png' />
        {product.description}
      </Item.Description>
      <Item.Extra>{product.title}</Item.Extra>
    </Item.Content>
  </Item>

    </div>
  )
}

export default ProductItem;
