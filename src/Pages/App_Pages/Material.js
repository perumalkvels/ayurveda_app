import React,{useState} from 'react';
import { useNavigate, useLocation, Link as RouterLink,Outlet} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button, Grid,Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function Material(){
  const { pathname } = useLocation();
  const curPath = pathname.split('/');
  const childRoute =  curPath[2];
  console.log('curPath',curPath);

  const navigate = useNavigate();

  return (
    <React.Fragment>
        <Grid 
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{mt:3}}
        >
            <Breadcrumbs aria-label="breadcrumb">
                
                <Link
                    underline="hover"
                    component={RouterLink}
                    to="/materials/showmaterials"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                >
                    <ListAltIcon sx={{ mr: 1 }} fontSize="small" />
                    Material Page
                </Link>
                <Typography color="text.disbled" sx={{color: '#757575'}}>
                    {childRoute === 'showmaterials' ? 
                                    <ListIcon sx={{ mr: 1 }} fontSize="small"/> : 
                                    <EditNoteIcon  sx={{ mr: 1 }} fontSize="small"/> }

                        {childRoute === 'editmaterial' ? 'Edit Material' : childRoute  }
                </Typography>
            </Breadcrumbs>
            {childRoute === 'showmaterials' ? (
                    <Button 
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={()=>{navigate('/materials/addmaterial')}}>
                        Add Material
                    </Button>
                ):(
                    <Button 
                        variant="contained"
                        startIcon={<ListAltIcon />}
                        onClick={()=>{navigate('/materials/showmaterials')}}>
                        Show Materials
                    </Button>
                )
            }
        </Grid>
        <Grid >
                <Outlet />
        </Grid>
    </React.Fragment>
  )
}




// Below waste code Here  

// import React,{useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setRawMaterialList } from '../../Redux/Slices/productData';
// import {
//   Checkbox, 
//   FormControl, 
//   FormControlLabel, 
//   Grid, 
//   InputLabel, 
//   MenuItem, 
//   Select, 
//   Stack, 
//   TextField 
// } from '@mui/material';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import { setAlertState } from '../../Redux/Slices/appSlice';
// import getProductId from '../../Utilz/getProductId';

// const RawMaterialPage = () => {

//   const rawMaterialList = useSelector(state => state.productData.rawMaterialList);

//   const dispatch = useDispatch();

//   const [rawMaterial, setRawMaterial] = useState({
//     r_id : '',
//     name : '',
//     category : '',
//     price : 0,
//     desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//   })

//   const updateRawMaterialList = async() =>{
//     console.log('rawMaterial',rawMaterial);
//     try {
//       await dispatch(setRawMaterialList([...rawMaterialList, {...rawMaterial, r_id : getProductId('r')}]));
//       dispatch(setAlertState({ active: true, msg: 'Successfully — Added to List!', response: 'success' }));
//     } catch (error) {
//       dispatch(setAlertState({ active: true, msg: error.message, response: 'failed' }));
//     }
//   }

//   return (
//     <div className='container-fluid'>
//       <Stack direction="row" spacing={3} >
//         <Grid container >
//           {rawMaterialList?.map((item,index) =>{
//             return(<div class="card w-25 mr-2" key={index}>
//                       <div class="card-body">
//                         <h5 class="card-title">{item.name}</h5>
//                         <p class="card-text">{item.desc}</p>
//                         <div className='d-flex'>
//                             <p class="card-text text-success h4">{item.price}rs per Kg</p>
//                             <button className="btn btn-primary ml-3" >Expolre Item</button>
//                         </div>
//                       </div>
//                     </div>
//                   )
//             })
//           }
//         </Grid>
//       </Stack>
//     <Container component="main" maxWidth="sm" sx={{ mb: 4, mt:5 }}>
//     <Typography variant="h6" gutterBottom>
//       Product Details
//     </Typography>
//     <Grid container spacing={3} >
//       <Grid item xs={12}>
//         <TextField
//           required
//           id="productName"
//           name="productName"
//           label="Product Name"
//           fullWidth
//           autoComplete="given-name"
//           variant="standard"
//           onChange={(e)=>{setRawMaterial({...rawMaterial, name : e.target.value})}}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           required
//           id="price"
//           name="price"
//           type="number"
//           label="Price of Raw Material Per KGs"
//           fullWidth
//           variant="standard"
//           inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
//           onChange={(e)=>{setRawMaterial({...rawMaterial, price : parseInt(e.target.value)})}}
//         />
//       </Grid>
      
//       <Grid item xs={12} >
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//             <InputLabel id="demo-simple-select-helper-label " sx={{ backgroundColor: 'white', px:1}}>category</InputLabel>
//             <Select
//               labelId="demo-simple-select-helper-label"
//               id="demo-simple-select-helper-label"
//               value={rawMaterial.category}
//               onChange={(e)=>{setRawMaterial({...rawMaterial, category : e.target.value})}}
//               label="category"
//             > 
//               <MenuItem value={'category1'}>Every Days</MenuItem>
//               <MenuItem value={'category2'}>Every 3 Days</MenuItem>
//               <MenuItem value={'category3'}>Every 7 Days</MenuItem>
//             </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12}>
//         <FormControlLabel
//           control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
//           label="Use this address for payment details"
//         />  
//         <Button 
//           fullWidth
//           variant="contained"
//           size="large"
//           sx={{mt:4}}
//           onClick={updateRawMaterialList}
//           >
//           Add Item
//         </Button>
//       </Grid>

//     </Grid>
//     </Container>
//     </div>)
// }

// export default RawMaterialPage
