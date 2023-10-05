import React,{useState} from 'react';
import { useNavigate, useLocation, Link as RouterLink,Outlet} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button, Grid,Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function Product(){
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
                    to="/products/showproducts"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                >
                    <ListAltIcon sx={{ mr: 1 }} fontSize="small" />
                    Product Page
                </Link>
                <Typography color="text.disbled" sx={{color: '#757575'}}>
                    {childRoute === 'showproducts' ? 
                                        <ListIcon sx={{ mr: 1 }} fontSize="small"/> 
                                    : 'addproduct' ?
                                        <AddCircleOutlineIcon  sx={{ mr: 1 }} fontSize="small"/>
                                    :   <EditNoteIcon  sx={{ mr: 1 }} fontSize="small"/> }

                    {childRoute === 'editProduct' ? 'Edit Product' : childRoute  }
                </Typography>
            </Breadcrumbs>
            {childRoute === 'showproducts' ? (
                    <Button 
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={()=>{navigate('/products/addproduct')}}>
                        Add Product
                    </Button>
                ):(
                    <Button 
                        variant="contained"
                        startIcon={<ListAltIcon />}
                        onClick={()=>{navigate('/products/showproducts')}}>
                        Show Product
                    </Button>
                )
            }
            </Grid>
            <div className='mt-2'>
                <Outlet />
            </div>
    </React.Fragment>
  )
}


// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//     const backgroundColor =
//       theme.palette.mode === 'light'
//         ? theme.palette.grey[100]
//         : theme.palette.grey[800];
//     return {
//       padding: '15px', 
//       backgroundColor,
//       height: theme.spacing(3),
//       color: theme.palette.text.primary,
//       fontWeight: theme.typography.fontWeightRegular,
//       '&:hover, &:focus': {
//         backgroundColor: emphasize(backgroundColor, 0.06),
//       },
//       '&:active': {
//         boxShadow: theme.shadows[1],
//         backgroundColor: emphasize(backgroundColor, 0.12),
//       },
//     };
//   }); 
  

    {/* <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          onClick={() => 
            navigate(`/products`)}
        //   href="#"
          label="Products"
          icon={<ListAltIcon fontSize="small" />}
        />
        <StyledBreadcrumb 
            component="a" 
            label={childRoute} 
        />
        
        {/* <StyledBreadcrumb component="a" href="#" label="Product" /> */}
    // </Breadcrumbs> */}