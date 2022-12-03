import { Alert, Box, Button, Card, Grid, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import SearchIcon from '@mui/icons-material/Search';
import products from './products.json';
import ProductList from './ProductList';
import AddProductModal from './AddProductModal';

function Products() {
    const [list, setList] = useState(products);
    const [modalOpen, setModalOpen] = useState(false);
    const [keyword, setKeyword] = useState("")
    const handleSearch = (val) => {
        if (keyword !== "" || val !== "") {
            var array = [];
            list.map((val) => {
                if((val.name.toLowerCase()).includes(keyword.toLowerCase())){
                    array.push(val);
                }
                
            })
            setList(array)
        }
        else{
            setList(products)
        }
    }
    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
        handleSearch(e.target.value);
    }
    const handleModal = () => {
        if (modalOpen) {
            setModalOpen(false)
        }
        else {
            setModalOpen(true)
        }
    }
    const handleRemove = (e) => {
        if(e.keyCode === 8){
            setList(products)
        }
        
    }
    return (

        <div>
            <Box sx={{ display: "flex", margin: 2 }}>
                <Grid item xs={10}>
                    <ValidatorForm onSubmit={() => handleSearch()}>
                        <TextValidator
                            color="success"
                            id="input-with-icon-textfield"
                            variant="outlined"
                            fullWidth
                            label="Search Products"
                            value={keyword}
                            onChange={handleChangeKeyword}
                            onKeyDown={handleRemove}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton className="search-btn" style={{ cursor: "pointer" }} type="submit">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </ValidatorForm>
                </Grid>
                <Grid item xs={2} sx={{ marginLeft: 2 }}>
                    <Button color="success" variant="contained" onClick={() => handleModal()}>Add products</Button>
                </Grid>
            </Box>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {list.length>0?
                list.map((li) => {
                    return (
                        <Grid item xs={3} key={li.id}>

                            <ProductList{...li} />

                        </Grid>
                    )
                }):
                <Grid item xs={12}>
                    <Alert severity='error'>No results found</Alert>
                </Grid>}
            </Grid>
            <AddProductModal open={modalOpen} handleModal={handleModal} />
        </div>
    )
}
export default Products;