import React,{useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import { useTheme } from '@mui/material/styles';
import Alert from '../../Components/Alert'
import TransitionAlerts from '../../Components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setProductList, setBillingItemList } from '../../Redux/Slices/productData';

export default function Dashboard(){
  const {palette} = useTheme();

  // const navigate = useNavigate();
  
  // useEffect(()=>{
  //   if(!isAuth) navigate('/login');
  // },[isAuth]);
  const dispatch = useDispatch();
  const {productList,billingItemList}= useSelector(state => state.productData);
  const rawMaterialList = useSelector(state => state.productData.rawMaterialList);

  const setUpProductsBasedMaterialList = async() => {

    const updatedAllProductsList = await productList.map((prod,index) => {

          const materialList = prod.rawMaterials?.map((material,index) => {

                    const {id,qty,qtyType} = material;
                    const [curMaterial] = rawMaterialList.filter( raw => raw.id === id);
                    const stdPrice = curMaterial.price;
                    const priceForQty = (qtyType === 'gram' || qtyType === 'ml') ? ((stdPrice/1000)*(parseInt(qty))) 
                                        : ((stdPrice/1000)*(parseInt(qty)*1000));
                    const item = { ...material, 'price' : priceForQty};
                    return item;
                    
          })
          const getproductPrice = materialList.reduce((acc,item) =>  acc+= item.price ,0);
          const updatedProduct = {...prod,price: getproductPrice, rawMaterials: materialList };
          return updatedProduct;
        })
        dispatch(setProductList(updatedAllProductsList));

  }

  // const setUpBillingListBasedMaterialList = async() => {
  //   const billingIdList = billingItemList.map( bill_item => bill_item.id );
  //   const updatedProductsList = await productList.map((prod,index) => {
  //             return billingIdList.includes(prod.p_id) &&
  //                         {
  //                           'id': prod.p_id,
  //                           'name' : prod.name,
  //                           'qty' : prod.qty,
  //                           'qtyType' : prod.qtyType,
  //                           'price' : prod.price,
  //                         }
  //             })
  //   const updatedMaterialList = await rawMaterialList.map((rawItems,index) => {
  //             return billingIdList.includes(rawItems.id) &&
  //                           {
  //                             'id': rawItems.id,
  //                             'name' : rawItems.name,
  //                             'qty' : rawItems.qty,
  //                             'qtyType' : rawItems.qtyType,
  //                             'price' : rawItems.price,
  //                           }
  //               })
  //     const updatedBillingList = [...updatedProductsList,...updatedMaterialList]
  //     dispatch(setBillingItemList(updatedBillingList));


  //     const updatedBillingList = billingItemList.map( bill_item => {

  //         const materialList = prod.rawMaterials?.map((material,index) => {
  //           if(bill_item.id === material.id){

  //           }
  //         }
  //     } );
  // }


  useEffect(() => {
    console.log('materialList Effect called');
    setUpProductsBasedMaterialList();
    // setUpBillingListBasedMaterialList();

  },[rawMaterialList]);


  const [open, setOpen] = React.useState(false);
  return (<>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen}/>
      <Sidebar open={open} setOpen={setOpen}/>

      <Box component="main" sx={{ flexGrow: 1, p:3 , mt:7,}}>
        <TransitionAlerts />
          <Outlet />
      </Box>
    </Box>
</> )
}

