import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Alert, Grid, Snackbar } from '@mui/material';
import Select from 'react-select';
import Product from './products.json';

export default function AddProductModal(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([
    { label: "jewellery", value: 1 },
    { label: "gadgets", value: 2 },
    { label: "Men's Wear", value: 3 }
  ]);
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState();
  const [image, setImage] = React.useState("");
  const [catError, setCatError] = React.useState(false);
  const [fileError, setFileError] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [snackmsg, setSnackMsg] = React.useState("");

  const handleSnackClose = () => {
    setSnackbarOpen(false)
  }
  const handleClose = () => {
    props.handleModal();
    setOpen(false);
  };
  React.useEffect(() => {
    if (props.open) {
      setOpen(props.open)
    }
  }, [props])

  const handleSelect = (selected) => {
    setCategory(selected);
    setCatError(false);
  }

  const handleFile = (file) => {
    setFileError(false)
    var acceptType = [".jpg",".jpeg",".png"];
    var file = file.target.files[0];
    if(file.name.search(".jpg") || file.name.search(".jpeg") || file.name.search(".png")){
      setImage(file)
    }
    else{
      setImage("")
    }
  }

  const handleSubmit = () => {
    if(category && category.length > 0 && image !== ""){
      var array = [];
      Product.map((list)=>{
        array.push(list.name)
      })
      if(array.filter(list => list !== name).length === array.length){
        setSnackbarOpen(true);
        setSeverity("success");
        setSnackMsg("Product added successfully");
        handleClose();
      }
      else{
        setSnackbarOpen(true);
        setSeverity("error");
        setSnackMsg("Product already Exist");
      }
    }
    else{
      if( category === undefined || category.length === 0){
        setCatError(true)
      }
      if(image === ""){
        setFileError(true)
      }
    }
  }
  return (
    <div>
      <Dialog
        fullWidth="md"
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Product</DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>

          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextValidator fullWidth label="Name *" value={name} onChange={(e) => setName(e.target.value)}
                  validators={['required']}
                  errorMessages={['This field is required']} />

              </Grid>
              <Grid item xs={4}>
                <TextValidator fullWidth label="Code *" value={code} onChange={(e) => setCode(e.target.value)} 
                validators={['required']}
                errorMessages={['This field is required']}/>

              </Grid>
              <Grid item xs={4}>
                <Select
                  placeholder={<div>Select Category *</div>}
                  options={options}
                  isMulti={true}
                  onChange={handleSelect}
                  value={category}
                />
                {catError?<span style={{fontSize:"12px",color:"#cc0000"}}>This field is required</span>:""}

              </Grid>
              <Grid item xs={8}>
                <TextValidator
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Multiline"
                  multiline
                  maxRows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

              </Grid>
              <Grid item xs={4}>
                <TextValidator fullWidth type="file" onChange={handleFile} helperText={fileError?"This is Required Field":""} error={fileError}/>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' >Add</Button>
          </DialogActions>
        </ValidatorForm>

      </Dialog>

      <Snackbar
        anchorOrigin={{vertical: 'top',
        horizontal: 'center', }}
        open={snackbarOpen}
        onClose={handleSnackClose}
      >
        <Alert severity={severity} onClose={handleSnackClose}>{snackmsg}</Alert>
      </Snackbar>
    </div>
  );
}