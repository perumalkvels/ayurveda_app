import { Box } from '@mui/material';
import React from 'react';
import ProductCard from '../../Components/Card';
import { useSelector } from 'react-redux';

const Home = ({route}) => {
  
  const productList = useSelector(state => state.productData.productList)
  return (
    <>
    
    <div className='d-flex justify-content-center align-items-center w-100' style={{height: '80vh'}}>
          <h1 className='text-center display-4'>Welcome to Ayurveda</h1>
    </div>
    </>
    )
}

export default Home

