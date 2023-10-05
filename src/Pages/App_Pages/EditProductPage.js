import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DataTable from '../../Components/DataTable';
import { setProductList } from '../../Redux/Slices/productData';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import ItemListTable from '../../Components/ItemListTable';
import MasterDataTable from '../../Components/MasterDataTable';


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


export default function EditProductPage() {
  
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { productList,rawMaterialList } = useSelector(state => state.productData);
  
  const [product,setProduct] = useState({});
  const [qty,setQty] = useState(0);
  const [qtyAlert,setQtyAlert] = useState(false);
  const [qtyType, setQtyType] = useState('');
  const [actionMode, setActionMode] = React.useState('');
  const [activeMaterialItem, setActiveMaterialItem] = useState(null);
  const [addedMaterialList, setAddedMaterialList] = useState([]);
  const [remainingRawItems, setRemainingRawItems] = useState([]);

  const findRemRawItemList = async() =>{
    if(addedMaterialList){
        const remainsRawItems = await rawMaterialList.filter( item => (!addedMaterialList.includes(item.id)));
        setRemainingRawItems(remainsRawItems);
    }else setRemainingRawItems(product.rawMaterials);
  }

  // After Set the qtyAlert to false we want to clear all the action stuffs
  React.useEffect(()=>{
    if(qtyAlert === false){
      setActiveMaterialItem(null);
      setActionMode('');
      setQtyType('');
      setQty(0);
    }
  },[qtyAlert])

  React.useEffect(() => {
    const fetchData = async () => {
      const [filterData] = await productList?.filter(item => item.p_id === productId);
      const rawItems = filterData?.rawMaterials;
      setProduct(filterData);
      if(rawItems){
          const addedIdList = await rawItems.map(item => item.id);
          setAddedMaterialList(addedIdList);
          findRemRawItemList();
      }};
  
    fetchData();
  }, [productId, productList]);

  React.useEffect(() => {
    findRemRawItemList();
  },[addedMaterialList]);

  // For Mainintaing QtyType Based on Qty
  React.useEffect(() => {
    if((qtyType==='gram' || qtyType==='ml') && qty >=1000){
        setQty(1);
        setQtyType(qtyType === 'gram' ? 'kg' : 'ltr');
      }
      else if((qtyType==='kg' || qtyType==='ltr') && qty>10){
        setQtyType(qtyType === 'kg' ? 'gram' : 'ml');
      }
  },[qty]);

  const getMaterialInAction = ([id,item,action=null]) => {
    if(action === 'delete'){
        
          const updatedList = productList?.map(prod => {

              if(prod.p_id === productId){

                  if(prod?.rawMaterials?.length === 1){
                    return {...prod, price: 0, rawMaterials: [] }
                  }else{
                    const filterMaterialItem = prod?.rawMaterials?.filter(rawItem => rawItem.id !== id);
                    return {...prod, price: prod.price - item.price,
                          rawMaterials:  filterMaterialItem }
                  }

              }
              return prod;
            
        })
        // console.log('updatedList',updatedList);
        dispatch(setProductList(updatedList));

    }else if(action === 'edit'){
      setQtyType(item.qty);
      setQtyType(item.qtyType);
      setActionMode(action);
      setActiveMaterialItem(item);
      setQtyAlert(true);
    }else{
      setQtyType(item.qtyType);
      setActiveMaterialItem(item);
      setQtyAlert(true);
    }
}

  const changeUpdatedQty = () => {
      const updatedList = productList?.map( item => {
        if(item.p_id === productId){
            const filterMaterialItem = item?.rawMaterials?.filter(rawItem => rawItem.id !== activeMaterialItem.id);
            const {id,name,category} = activeMaterialItem;
            const [curMaterialData] = rawMaterialList?.filter(item => item.id === id)
            const priceForQty = (qtyType === 'gram' || qtyType === 'ml') ? ((curMaterialData.price/1000)*(parseInt(qty))) 
                                                                          : ((curMaterialData.price/1000)*(parseInt(qty)*1000));

            const productPrice = filterMaterialItem?.reduce((acc, item) => acc += item.priceForQty, 0)

            return {...item,price : productPrice+priceForQty,
                    rawMaterials: [{ 
                                      'id' : id,
                                      'name': name,
                                      'category' : category,
                                      'qty' : qty,
                                      'qtyType': qtyType,
                                      'price' : priceForQty,
                                    },
                                    ...filterMaterialItem,
                                      ]}
            }
            return item;
      })
      dispatch(setProductList(updatedList));
      setQtyAlert(false);
  }

  const closeQtyAlert = () =>{
      setQtyAlert(false);
      setQty(0);
      setQtyType('');
      setActiveMaterialItem(null);
  }

    // This Funtion for Adding Materials to Product
  const addItemToProduct = () => {
        const {id,name,price,category} = activeMaterialItem;
        console.log('activeMaterialItem',activeMaterialItem);
        console.log('id',id,'name',name,'price',price);
        const priceForQty = (qtyType === 'gram' || qtyType === 'ml') ? ((price/1000)*(parseInt(qty))) 
                                                                    : ((price/1000)*(parseInt(qty)*1000));
        console.log('priceForQty',priceForQty);
        const productPrice = product?.rawMaterials?.reduce((acc, item) => acc += item.price, 0);
        console.log('productPrice',productPrice);
        // console.log('priceforTotal',typeof(priceForQty+productPrice));
        const updatedList = productList?.map( item => {
                if(item.p_id === productId){ 
                    return {...item,price: productPrice+priceForQty,
                            rawMaterials:
                                  [...item.rawMaterials,
                                    {
                                      'id' : id,
                                      'name': name,
                                      'category' : category,
                                      'qty' : qty,
                                      'qtyType': qtyType,
                                      'price' : priceForQty 
                                    }
                                  ]
                            }
                  }
                  return item;
        })
        // console.log('updatedList from add product',updatedList,'priceproduct',productPrice);
        dispatch(setProductList(updatedList));
        setAddedMaterialList([...addedMaterialList,id]);
        setQtyAlert(false);
    }

    // This Funtion for providing Radio Buttons for Modal 
    const getRadioButton = useMemo(() => {
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
                    </>) : (<>
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
                    </>) 
                  }
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </>)
    }, [qtyType, activeMaterialItem]);

  return (
    <React.Fragment>
      <Modal
          open={qtyAlert}
          onClose={closeQtyAlert}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:3}}>
              {`Enter The Quantity of "${activeMaterialItem?.name}" :`}
            </Typography>
            {getRadioButton}
            <Grid container spacing={1} >
                <Grid item xs={12}>
                  <TextField
                    required
                    id="quantity"
                    name="quantity"
                    label={ qtyType === 'gram' ? "Enter Your Quantity in Gram" : 
                             qtyType === 'kg' ?  "Enter Your Quantity in Kilo-Gram" : 
                             qtyType === 'ml' ?  "Enter Your Quantity in Milli-Litre" :
                                                  "Enter Your Quantity in Litre"
                          }
                    type= "number"
                    fullWidth
                    variant="standard"
                    value={qty}
                    inputProps={{ maxLength: 4 }}
                    onChange={(e)=>{setQty(parseInt(e.target.value))}}
                  />
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Box  sx={{mt:1}}>
                    <Button variant="contained" sx={{m:1,mr:2}} onClick={()=>{actionMode? changeUpdatedQty() : addItemToProduct()}}>Save</Button>
                    <Button variant="contained" onClick={()=>{setQtyAlert(false)}}>cancel</Button>
                  </Box>
                </Grid>
            </Grid>
          </Box>
      </Modal>
      {product && (<>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                  component="img"
                  sx={{ width: 250 }}
                  image={product.image_url}
                  alt="Product album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h4" sx={{p:1}}>
                        {(product.name)?.toUpperCase()}
                      </Typography>
                      <Typography component="div" variant="h5" sx={{p:1}}>
                        {product.desc}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div" sx={{p:1}}>
                      {product?.rawMaterials?.length !== 0  ? 
                              `Price with Incredients - ${product.price} Rs` 
                               : 'No Incredients are added Currently'}
                      </Typography>
                  </CardContent>
              </Box>
            </Card>
          </>)
      }
      <Card sx={{mt:5 }}>
          <Typography  component="div" variant="h5" sx={{p:2}} >
              Raw Material Section
          </Typography>
      </Card>
      <Grid container spacing={3} sx={{ p:4}} >

        <Grid item xs={8} >
          {/* <DataTable 
            updateRawMaterial={updateRawMaterial}
            removeRawMaterial={removeRawMaterial} 
            masterList={product.rawMaterials}
          /> */}
           <MasterDataTable 
                 getMaterialInAction={getMaterialInAction}
                 masterList={product?.rawMaterials} 
                 tableName={'Added Raw Materials List'}
                 access={false}/>
        </Grid>
        <Grid item xs={4} >
            <ItemListTable getMaterialInAction={getMaterialInAction} itemList={remainingRawItems}/>
        </Grid>
      </Grid>
      </React.Fragment>
  )
}


            {/* <Grid container justifyContent="flex-end">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label" align="right" sx={{mr:2}}>Select Type</FormLabel>
                  <RadioGroup
                    row
                    defaultValue="gram"
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={qtyType}
                    onChange={(e)=>setQtyType(e.target.value)}
                  >
                    <FormControlLabel value="gram"  checked={qtyType === 'gram'} control={<Radio />} label="gram" />
                    <FormControlLabel value="kg" checked={qtyType === 'kg'} control={<Radio />} label="kg" />
                  </RadioGroup>
              </FormControl>
            </Grid> */}