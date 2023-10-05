import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRawMaterialList } from '../../Redux/Slices/productData';
import {
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  Grid, 
  TextField 
} from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { setAlertState } from '../../Redux/Slices/appSlice';
import getProductId from '../../Utilz/getProductId';
export default function AddMaterialPage({closeActionAlert,confirmUpdateEdit,itemInActionn}){

  const rawMaterialList = useSelector(state => state.productData.rawMaterialList);
  const dispatch = useDispatch();

  const [rawMaterial, setRawMaterial] = useState({
    id : '',
    name : '',
    category : '',
    qtyType: '',
    price : 0,
    desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
  })

  useEffect(() => {

    const checkpoint1 = (rawMaterial.category === 'herbal') || (rawMaterial.category === 'oilItems');
    if(rawMaterial.category === 'medicine' && rawMaterial.qtyType !== 'kg'){
      setRawMaterial({...rawMaterial, qtyType: 'kg'});
    };
    if(checkpoint1 && (rawMaterial.qtyType !== 'ltr')){
      setRawMaterial({...rawMaterial, qtyType: 'ltr'});
    }
  }, [rawMaterial]);

  const updateRawMaterialList = async() =>{
    try {
      await dispatch(setRawMaterialList([...rawMaterialList, {...rawMaterial, id : getProductId('r')}]));
      dispatch(setAlertState({ active: true, msg: 'Successfully — Added to List!', response: 'success' }));
    } catch (error) {
      dispatch(setAlertState({ active: true, msg: error.message, response: 'error' }));
    }
  }

  const getPriceLabelText = () => {

      const {category,qtyType} = rawMaterial;
      if(category === 'medicine' || qtyType === 'kg' ){
        return 'கிராம் கணக்கில் அதன் விலை';
      }
      else{
        return 'லிட்டர் கணக்கில் அதன் விலை';
      }
      // `${rawMaterial.qtyType === 'kg' ? 'கிராம்' : 'லிட்டர்' } கணக்கில் அதன் விலை`
  }

  return (
    <div className='container-fluid'>
    <Container component="main" maxWidth="sm" sx={{ mb: 4, mt:5 }}>
    <Typography variant="h5" gutterBottom textAlign='center'>
        Enter Your Product Details Here
    </Typography>
    <Grid container spacing={4} sx={{mt:3}}>
      <Grid item xs={12}>
        <TextField
          required
          id="productName"
          name="productName"
          label="பொருள் பெயர்"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          onChange={(e)=>{setRawMaterial({...rawMaterial, name : e.target.value})}}
        />
      </Grid>
      <Grid item
        container 
        sx={{mt:1}} 
        direction="row"
        justifyContent="center"
        alignItems="center"
        md={12}
        >
        <Grid xs={6} >
          <FormControl sx={{mt:2, minWidth: 300 }}>
                <InputLabel required id="demo-simple-select-helper-label1" sx={{ pr:6, mr:6}}>பொருள்  வகை </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-helper-label1"
                  id="demo-simple-select-helper-label1"
                  value={rawMaterial.category}
                  onChange={(e)=>{setRawMaterial({...rawMaterial, category : e.target.value})}}
                  label="பொருள் வகை"
                  sx={{ textAlign: "center",}}
                > 
                  
                  <MenuItem value={'medicine'}>மருந்துப்பொருள்கள்</MenuItem>
                  <MenuItem value={'herbal'}>மூலிகைகள்</MenuItem>
                  <MenuItem value={'oilItems'}>எண்ணெய்கள்</MenuItem>
                  
                </Select>
            </FormControl>
        </Grid>
        <Grid xs={6} >
          <FormControl sx={{mt:2,ml:6, minWidth: 220 }} disabled={ rawMaterial.category ? true : false} >
                <InputLabel required id="demo-simple-select-helper-label2" sx={{px:3}}>அளவீடு</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-helper-label2"
                  id="demo-simple-select-helper-label2"
                  value={rawMaterial.qtyType}
                  onChange={(e)=>{setRawMaterial({...rawMaterial, qtyType : e.target.value})}}
                  label="பொருள் வகை"
                  sx={{ textAlign: "center",}}
                > 
                 <MenuItem value={'kg'}>கிராம்</MenuItem>
                 <MenuItem value={'ltr'}>லிட்டர்</MenuItem>   
                </Select>
            </FormControl>
        </Grid>
      </Grid>
      
      <Grid item xs={12} >
        <TextField
            disabled={ ( rawMaterial.category || rawMaterial.qtyType ) ? false : true }
            required
            id="price"
            name="price"
            type="number"
            label={getPriceLabelText()}
            fullWidth
            variant="standard"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
            onChange={(e)=>{setRawMaterial({...rawMaterial, price : parseInt(e.target.value)})}}
          />
          {console.log(rawMaterial.qtyType,rawMaterial.category )}
      </Grid>
      <Grid item xs={12} sx={{mt:2}}>
        <FormControlLabel
          required
          control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
          label="குறிப்புகளை சரிபார்த்து உறுதிப்படுத்தவும்"
        />  
      </Grid>
      <Grid item xs={12}>
        <Button 
          fullWidth
          variant="contained"
          size="large"
          // sx={{mt:4}}
          onClick={updateRawMaterialList}
          >
          பொருளை பட்டியலில் சேர்க்கவும்
        </Button>
        </Grid>
    </Grid>
    </Container>
    </div>)
}

{/* <Stack direction="row" spacing={3} >
<Grid container >
  {rawMaterialList?.map((item,index) =>{
    return(<div class="card w-25 mr-2" key={index}>
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">{item.desc}</p>
                <div className='d-flex'>
                    <p class="card-text text-success h4">{item.price}rs per Kg</p>
                    <button className="btn btn-primary ml-3" >Expolre Item</button>
                </div>
              </div>
            </div>
          )
    })
  }
</Grid>
</Stack> */}
