
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function ProductList(props) {

  return (
    <Card sx={{ maxWidth: 345}}>      
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt={props.name}
      />
      <CardContent sx={{height:"200px",overflow:"hidden",padding:2}}>
      <Typography gutterBottom variant="h5" component="div">
      {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{paddingBottom:2}}>
        {props.description}
        </Typography>
      </CardContent>

     
    </Card>
  );
}