import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import StoreIcon from '@mui/icons-material/Store';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedTable from './Waste';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MasterDataTable from '../../Components/MasterDataTable';
import ItemListTable from '../../Components/ItemListTable';

import { setBillingItemList } from '../../Redux/Slices/productData';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius : 3,
  p: 3,
};

export default function CreateBillingPage(){

  const dispatch = useDispatch();
  const {productList,rawMaterialList,billingItemList } = useSelector(state => state.productData);

  const [qty,setQty] = useState(0);
  const [qtyAlert,setQtyAlert] = useState(false);
  const [qtyType, setQtyType] = useState('');
  const [actionMode, setActionMode] = useState('');
  const [activeMaterialItem, setActiveMaterialItem] = useState(null);


  const [billingItemIDList,setBillingItemIDList] = useState([]);

  const [remProductList,setRemProductList] = useState([]);
  const [remMaterialList,setRemMaterialList] = useState([]);



  const filterRemItems = () =>{
      
    const remMaterials = rawMaterialList.filter(item => (!billingItemIDList.includes(item.id)) ) 
    setRemMaterialList(remMaterials);

    const remproducts = productList.filter(item => (!billingItemIDList.includes(item.p_id)) ) 
    setRemProductList(remproducts);

  }

  console.log('remProductList',remProductList);
  console.log('remMaterialList',remMaterialList);
  // After Set the qtyAlert to false we want to clear all the action stuffs
  useEffect(()=>{
    if(qtyAlert === false){
      setActiveMaterialItem(null);
      setActionMode('');
      setQtyType('');
      setQty(0);
    }
  },[qtyAlert])

  
  useEffect(() => {
    
    const billingIdList = billingItemList.map(item => item.id);
    setBillingItemIDList(billingIdList);
    filterRemItems();

  },[billingItemList]);


  useEffect(()=>{
    filterRemItems();
  },[billingItemIDList])

  // For Mainintaing QtyType Based on Qty
  useEffect(() => {

    if((qtyType==='gram' || qtyType==='ml') && qty >=1000){
        console.log('yes changed');
        setQty(1);
        setQtyType(qtyType === 'gram' ? 'kg' : 'ltr');
      }
      else if((qtyType==='kg' || qtyType==='ltr') && qty>10){
        setQtyType(qtyType === 'kg' ? 'gram' : 'ml');
      }
  },[qty]);


  const getMaterialInAction = ([id,item,action=null]) => {

    action && setActionMode(action);
    setActiveMaterialItem(item);
    setQty(item.qty);
    setQtyType(item.qtyType);
    setQtyAlert(true);

  }

  const closeQtyAlert = () =>{

    setActiveMaterialItem(null);
    setQtyAlert(false);
    setActionMode('');
    setQtyType('');
    setQty('');

  }


  // This Funtion is for add the item to billingList
  const addItemtoBilling = () => {

    if(qtyType === 'pkg'){
        const {p_id,name,price} = activeMaterialItem;
        const product = {
                id: p_id,
                name: name,
                qty: parseInt(qty),
                qtyType: 'pkg',
                price : price ? Math.round((parseInt(qty))*price) : 0 ,
        }
        dispatch(setBillingItemList([...billingItemList,product]));
      }else{
        const {id,name,price,category} = activeMaterialItem;
        const priceForQty = ( qtyType === 'gram' ||  qtyType === 'ml' ) ? ((price/1000)*(parseInt(qty))) 
                                                                        : ((price/1000)*(parseInt(qty)*1000));
        const material = {
                  id: id,
                  name: name,
                  qty: parseInt(qty),
                  qtyType: qtyType,
                  category: category,
                  price : Math.round(priceForQty),
        }
      dispatch(setBillingItemList([...billingItemList,material]));
    }
    setQtyAlert(false);
  }

  
  const updateItemtoBilling = async() => {

    const {id} = activeMaterialItem;
    const filterList = billingItemList.filter(item => item.id !== id); 
     if(qtyType === 'pkg'){
        const {name} = activeMaterialItem;
        const pricePerPkg = activeMaterialItem.price / activeMaterialItem.qty;

        const product = {
                id: id,
                name: name,
                qty: parseInt(qty),
                qtyType: 'pkg',
                price : Math.round((parseInt(qty))*pricePerPkg),
        }
        dispatch(setBillingItemList([product,...filterList]));
      }else{
        const {name,category} = activeMaterialItem;
        const [item] = rawMaterialList.filter(item => item.id === id);
        const priceForQty = ( qtyType === 'gram' ||  qtyType === 'ml' ) ? ((item.price/1000)*(parseInt(qty))) 
                                                                        : ((item.price/1000)*(parseInt(qty)*1000));
        const material = {
                  id: id,
                  name: name,
                  qty: qty,
                  qtyType: qtyType,
                  category: category,
                  price : Math.round(priceForQty),
        }
        dispatch(setBillingItemList([material,...filterList]));
      }
    setQtyAlert(false);
  }


  const removeItemFromBiling = () =>{
    const filterList = billingItemList.filter(item => item.id !== activeMaterialItem.id); 
    dispatch(dispatch(setBillingItemList(filterList)));
    setQtyAlert(false);
  }

  // This Funtion for providing Radio Buttons for Modal 
  const getRadioButton = useMemo(() => {

    if ((qtyType !== 'pkg') && (actionMode!== 'delete')) {
        return (<>
            <Grid container justifyContent="flex-end">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" align="right" sx={{mr:2}}>Select Type</FormLabel>
                <RadioGroup
                    row
                    defaultValue="gram"
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={qty}
                    onChange={(e)=>setQtyType(e.target.value)} 
                  >
                  {(qtyType === 'kg' || qtyType === 'gram') ? (<>
                        <FormControlLabel
                          value="gram"
                          checked={qtyType === 'gram'}
                          control={<Radio />}
                          label="gram"
                        />
                        <FormControlLabel
                          value="kg"
                          checked={qtyType === 'kg'}
                          control={<Radio />}
                          label="kg"
                        />
                  </>) : (qtyType === 'ltr' || qtyType === 'ml' )?  (<>
                        <FormControlLabel
                          value="ml"
                          checked={qtyType === 'ml'}
                          control={<Radio />}
                          label="ml"
                          />
                        <FormControlLabel
                          value="ltr"
                          checked={qtyType === 'ltr'}
                          control={<Radio />}
                          label="ltr"
                        />
                  </>) : (<></>)
                }

                </RadioGroup>
                </FormControl>
              </Grid>
            </>)
    }else{
      return (<></>)
    }
  }, [qtyType, activeMaterialItem]);

  console.log('actionMode',actionMode);
return (
    <Grid container spacing={2} sx={{mt: 6}} >
      <Modal
          open={qtyAlert}
          onClose={closeQtyAlert}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:3}}>
              {`Enter The Quantity of  Item :`}
              {/* "${activeMaterialItem?.id}" */}
            </Typography>

            {getRadioButton}
            <Grid container spacing={1} >
              {actionMode !== 'delete' && (<>
                  <Grid item xs={12}>
                      <TextField
                        required
                        id="quantity"
                        name="quantity"
                        label={
                              // qtyType === 'gram' || 'ml' ? `Enter Your Quantity in ${qtyType}` : `Enter Your Quantity in  ${qtyType}`
                              // `Enter Your Quantity in ${qtyType}`
                              `Enter Your Quantity in`
                              }
                        type= "number"
                        fullWidth
                        variant="standard"
                        value={qty}
                        inputProps={{ maxLength: 4 }}
                        onChange={(e)=>{setQty(e.target.value)}}
                      />
                  </Grid>
                </>)
              }
                <Grid container justifyContent="flex-end">
                    <Box  sx={{mt:1}}>
                    {(actionMode === 'edit' || actionMode === 'delete') ? 
                        (<>
                          {actionMode === 'edit' ? 
                            (<Button variant="contained" sx={{m:1,mr:2}}  onClick={()=> updateItemtoBilling()}>Update</Button>)
                          : (<Button variant="contained" sx={{m:1,mr:2}}  onClick={()=> removeItemFromBiling()}>Delete</Button>)
                          }
                          <Button variant="contained" onClick={()=>{setQtyAlert(false)}}>cancel</Button>
                        </>)
                      :
                        (<>
                            <Button variant="contained" sx={{m:1,mr:2}}  onClick={()=> addItemtoBilling()}>Save</Button>
                            <Button variant="contained" onClick={()=>{setQtyAlert(false)}}>cancel</Button>
                        </>)
                      }
                    </Box>
                  </Grid>
              </Grid>
          
 
          </Box>
      </Modal>
      <Grid item xs={3} >
            <ItemListTable getMaterialInAction={getMaterialInAction} itemList={remProductList} access={false} reqFrom={'product'} />
        </Grid>
        <Grid item xs={6} >
            <MasterDataTable 
                 getMaterialInAction={getMaterialInAction}
                 masterList={billingItemList} 
                 setBillingItemList={setBillingItemList} 
                 access={false}/>
        </Grid>
        <Grid item xs={3} >
            <ItemListTable getMaterialInAction={getMaterialInAction} itemList={remMaterialList} access={false} reqFrom={'material'}/>
        </Grid>
    </Grid>
  )
}

