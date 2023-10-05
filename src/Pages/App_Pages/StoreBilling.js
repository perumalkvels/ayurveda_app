import React,{useState} from 'react';
import { useNavigate, useLocation, Link as RouterLink,Outlet} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListIcon from '@mui/icons-material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button, Grid,Typography } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function StoreBilling(){
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
                    to="/storebilling/createBilling"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                >
                    <ListAltIcon sx={{ mr: 1 }} fontSize="small" />
                    Store Billing Page
                </Link>
                <Typography color="text.disbled" sx={{color: '#757575'}}>
                    {childRoute === 'showmaterials' ? 
                                    <ListIcon sx={{ mr: 1 }} fontSize="small"/> : 
                                    <EditNoteIcon  sx={{ mr: 1 }} fontSize="small"/> }

                        {childRoute === 'editmaterial' ? 'Edit Material' : childRoute  }
                </Typography>
            </Breadcrumbs>
            {childRoute === 'generteBilling' ? (
                    <Button 
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={()=>{navigate('/storebilling/createBilling')}}>
                        Show Current Bill
                    </Button>
                ):(
                    <Button 
                        variant="contained"
                        startIcon={<ListAltIcon />}
                        onClick={()=>{navigate('/storebilling/generteBilling')}}>
                        Generate Current Bill
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

