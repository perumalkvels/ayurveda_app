import React,{useState} from 'react';
import { useNavigate, useLocation, Link,Outlet} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { setAlertState } from '../../Redux/Slices/appSlice';
import { setProductList } from '../../Redux/Slices/productData';

import getProductId from '../../Utilz/getProductId';

export default function AddProductPage(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector(state => state.productData.productList);

    const [product, setProduct] = useState({
      p_id : '',
      name : '',
      category : '',
      price : 0,
      image_url : '',
      desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui',
      rawMaterials : [],
    })
  
    const updateProductList = async() =>{
        try {
            dispatch(setProductList([...productList, {...product, p_id : getProductId('p')}]));
            dispatch(setAlertState({ active: true, msg: 'Successfully — Added to List!', response: 'success' }));
            // setProduct({...product,p_id : '',name: '',category: '',image_url: ''})
          } 
        catch (error) {
            dispatch(setAlertState({ active: true, msg: error.message, response: 'error' }));
          }
    }
  
    return (
      <React.Fragment>
        <Container component="main" maxWidth="sm" sx={{ mb: 4, mt:5 }}>
        <Typography variant="h6" gutterBottom>
          Product Details
        </Typography>
        <Grid container spacing={3} >
          <Grid item xs={12}>
            <TextField
              required
              id="productName"
              name="productName"
              label="பொருள் பெயர்"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e)=>{setProduct({...product,name : e.target.value})}}
            />
          </Grid>
          
          <Grid item xs={12} >
          <FormControl sx={{ mt: 3, minWidth: 320 }}>
                <InputLabel id="demo-simple-select-helper-label " sx={{ backgroundColor: 'white', px:1}}>பொருள் வகை</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper-label"
                  value={product.category}
                  onChange={(e)=>{setProduct({...product,category : e.target.value})}}
                  label="பொருள் வகை"
                > 
                  <MenuItem value={'ointment'}>தைலம் வகை</MenuItem>
                  <MenuItem value={'powder'}>பொடி வகை</MenuItem>
                  <MenuItem value={'broth'}>கசாயம் வகை</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
          <TextField
              required
              id="image_url"
              name="image_url"
              label="புகைப்பட இணைப்பு"
              fullWidth
              variant="standard"
              onChange={(e)=>{setProduct({...product,image_url : e.target.value})}}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="குறிப்புகளை சரிபார்த்து உறுதிப்படுத்தவும்"
            />  
            <Button 
              fullWidth
              variant="contained"
              size="large"
              sx={{mt:4}}
              onClick={updateProductList}
              >
              Add Item
            </Button>
          </Grid>
        
        </Grid>
        </Container>
      </React.Fragment>
    );
}


// const jsonData =[ 
//       {
//         p_id: "p_0001", // we can get the p_id from current date and time 
//         name: "medicine 1",
//         category: "category2",
//         desc: "This Prooduct is Lorem and its more lorem concepts and react and mateiral ui",
//         image_url: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/Ayurvedic-herb-herb-turmeric-indian-spices-1296x728-header-1296x728.jpg?w=1155&h=1528",
//         price: 0,
//         rawMaterials : [
//           {
//             r_id : "r_0001", // we can get the r_id from current date and time 
//             r_name : 'raw_material_1',
//             qty : '50kg',
//             priceForQty: 75
//           },
//           {
//             r_id : "r_0002",
//             r_name : 'raw_material_2',
//             qty : '100kg',
//             priceForQty: 125
//           },
//           {
//             r_id : "r_0003", 
//             r_name : 'raw_material_2',
//             qty : '100kg',
//             priceForQty: 150
//           },
//         ]
//         },
//         {
//         name: "medicine 2",
//         category: "category2",
//         desc: "This Prooduct is Lorem and its more lorem concepts and react and mateiral ui",
//         image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtc3UCAT4K0B6mneAhyqjwjkmaMlmN9n2sURt-J1roobjZT35ADJAljBSyTmnxvaYi934&usqp=CAU",
//         price: 0,
//         },
//         {
//           name: "medicine 3",
//           category: "category2",
//           desc: "This Prooduct is Lorem and its more lorem concepts and react and mateiral ui",
//           image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0DSuMkyJ9HqY0m9O0aRxjrIM2DFIeTBtI-KgPrka2tvrsmCZy67MAnb7WZBKnvYn0hnM&usqp=CAU",
//           price: 0,
//         },
//         {
//           name: "medicine 4",
//           category: "category2",
//           desc: "This Prooduct is Lorem and its more lorem concepts and react and mateiral ui",
//           image_url: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/Ayurvedic-herb-herb-turmeric-indian-spices-1296x728-header-1296x728.jpg?w=1155&h=1528",
//           price: 0,
//         }
//       ]