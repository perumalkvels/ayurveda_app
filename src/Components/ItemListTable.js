import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { styled, alpha,useTheme } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { FormControl,InputLabel, MenuItem, Select } from '@mui/material';

const StyledList = styled(List)`
  max-height: 500px;
  overflow: auto;
  padding: 0 24px;
  
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #9d9d9d;
    border-radius: 5px;
  }
`;
export default function ItemListTable(
  { itemList,
    getMaterialInAction,
    reqFrom
  }){

  const [itemToShow,setItemsToShow] = React.useState([]);
  const [categorySelection,setCategorySelection] = React.useState('');
  const {palette} = useTheme();

  React.useEffect(()=>{
    if(categorySelection === ''){
      setItemsToShow(itemList);
    }else{
      console.log('catagorySelection',categorySelection);
      const filteredData = itemList.filter( item => item.category === categorySelection);
      
      setItemsToShow(filteredData);
    }
  },[categorySelection]);

  React.useEffect(()=>{
    setItemsToShow(itemList);
  },[itemList]);


  return (
    <Box>
      <AppBar
          position="static"
          color="default"
          elevation={4}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)',backgroundColor: alpha(palette.background.paper, 0.65) }}
          >

            <Toolbar>
                <Grid container spacing={1} alignItems="center" >
                      {/* <Grid item>
                          <SearchIcon color="inherit" sx={{ display: 'block' }} />
                      </Grid> */}
                      <Grid item xs>
                        {/* <TextField
                          placeholder="Search by price"
                          fullWidth
                          InputProps={{
                              disableUnderline: true,
                              sx: { 
                              // width: '100%',
                              p: 1,pl: 2,  
                              textAlign: 'center',
                              backgroundColor: alpha(palette.background.default, 1),
                              fontSize: 'default' },
                          }}
                          variant="standard"
                          /> */}
                        {reqFrom === 'material' && (<>
                          <FormControl sx={{mr:2, minWidth: 200 }} size="small" >
                            <InputLabel id="demo-simple-select-helper-label1">Category </InputLabel>
                                <Select
                                  labelId="demo-simple-select-helper-label1"
                                  id="demo-simple-select-helper-label1"
                                  value={categorySelection}
                                  onChange={(e)=>{setCategorySelection(e.target.value)}}
                                  label="பொருள் வகை"
                                  sx={{ textAlign: "center" }}
                                > 
                                  
                                  <MenuItem value={'medicine'}>மருந்துப்பொருள்கள்</MenuItem>
                                  <MenuItem value={'herbal'}>மூலிகைகள்</MenuItem>
                                  <MenuItem value={'oilItems'}>எண்ணெய்கள்</MenuItem>
                                  
                                </Select>
                         </FormControl>
                        </>)}

                      </Grid>
                <Grid item>
                    <Tooltip title="Reload">
                    <IconButton onClick={() => setCategorySelection('')}>
                        <FilterListIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                    </Tooltip>
                </Grid>
                </Grid>
   
            </Toolbar>
      </AppBar>
      <Box sx={{p:1, pt:3, textAlign: 'left',backgroundColor: '#eeeeee'}}>
          <StyledList 
                sx={{overflow: 'auto',px:3, pt:1}}
                className="custom-scrollbar" > 
                {itemToShow?.map((item,index) => {
                    return (
                        <ListItem sx={{backgroundColor : '#d0d0d0',mb:1,borderRadius:3}} key={index}> 
                            <ListItemText primary={item.name}/>
                            <IconButton onClick={()=> { getMaterialInAction( reqFrom === 'product' ? [item.p_id,item] : [item.id,item]) }}>
                                    <AddIcon color="inherit" sx={{ display: 'block' }} />
                            </IconButton>
                        </ListItem>
                        );
                })
                }
          </StyledList>
      </Box> 
      </Box>
        )
}
