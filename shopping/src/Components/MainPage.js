import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import Products from './Products';

export default function MainPage() {
  return (
    <Box sx={{backgroundColor:"#ecffb3",maxHeight:"100%"}}>
        <Grid container>
            <Grid item xs={12}>
            <AppBar position="fixed" sx={{height:70,paddingLeft:2, backgroundColor:"#4d6600"}}>
       <h1>Dream Shopping App</h1>
      </AppBar>
            </Grid>
            <Grid item xs={12} sx={{marginTop:10}}>
            <Products/>

            </Grid>
        </Grid>
      
      
    </Box>
  );
}