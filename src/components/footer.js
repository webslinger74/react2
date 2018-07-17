import React from 'react'
import {Grid} from 'semantic-ui-react';


const Footer = () => {
  return (
    <div> 
    <Grid>
         <Grid.Column width={16} className="footerheader">
             <h4 className="header__header"> React Footer</h4>
         </Grid.Column>
   </Grid>


   <Grid>
   <Grid.Column width={4} className="footerheader">
       <h5>Contact</h5>
   </Grid.Column>
   <Grid.Column width={4} className="footerheader">
   <h5>Terms & Conditions</h5>
</Grid.Column>
<Grid.Column width={4} className="footerheader">
<h5>Payments</h5>
</Grid.Column>
<Grid.Column width={4} className="footerheader">
<h5>Further Info</h5>
</Grid.Column>
</Grid>




    </div>
  )
}

export default Footer
