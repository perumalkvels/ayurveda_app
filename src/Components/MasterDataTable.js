import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled,alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Modal from '@mui/material/Modal';
 
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import styled from 'styled-components';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { setBillingItemList, setRawMaterialList } from '../Redux/Slices/productData';

const styledModel = {
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // borderColor: theme.palette.primary,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCellsLarge = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Material_id',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'qtyType',
    numeric: true,
    disablePadding: false,
    label: 'QtyType',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'editIcon',
    numeric: true,
    disablePadding: false,
    label: 'Edit',
  },
  {
    id: 'removeIcon',
    numeric: true,
    disablePadding: false,
    label: 'Remove',
  },
];

const headCellsSmall = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'qty',
      numeric: true,
      disablePadding: false,
      label: 'Qty',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'editIcon',
      numeric: true,
      disablePadding: false,
      label: 'Edit',
    },
    {
      id: 'removeIcon',
      numeric: true,
      disablePadding: false,
      label: 'Remove',
    },
  ];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,masterAccess } =
    props;
  const headerData = masterAccess === true ? headCellsLarge : headCellsSmall;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            // align="center"
            sx={{ml:4}}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headerData?.map((headCell) => (

          <TableCell
            key={headCell.id}
            align={headCell.id === 'name'? 'center' : 'left'}
            sx={{minWidth: headCell.id === 'name' ? '220px' : '80px'}}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
          {headCell.label}

          {headCell !== ( 'edit' || 'Remove' ) ? (<>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
        
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </>) : null }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected,
          catagorySelection,
          setCatagorySelection,
          searchSelection,
          setSearchSelection,
          optionsDiable,
          masterAccess,
          tableName} = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' ,ml: 1}}
          variant="h6"
          id="tableTitle"
          component="div"
        >
         {tableName}
        </Typography>
      )}
    {masterAccess && (<>
       <Search sx={{
            // borderColor: '',
            border: 1,
            }}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                disabled={optionsDiable}
                onChange={(e)=>setSearchSelection(e.target.value)}
                value={searchSelection}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        </>)
      }
      <FormControl sx={{mr:2, minWidth: masterAccess? 250 : 200 }} size="small" disabled={optionsDiable} >
                <InputLabel id="demo-simple-select-helper-label1">Category </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label1"
                  id="demo-simple-select-helper-label1"
                  value={catagorySelection}
                  onChange={(e)=>{setCatagorySelection(e.target.value)}}
                  label="பொருள் வகை"
                  sx={{ textAlign: "center",}}
                > 
                  
                  <MenuItem value={'medicine'}>மருந்துப்பொருள்கள்</MenuItem>
                  <MenuItem value={'herbal'}>மூலிகைகள்</MenuItem>
                  <MenuItem value={'oilItems'}>எண்ணெய்கள்</MenuItem>
                  
                </Select>
      </FormControl>

      <Tooltip title="Filter list">
          <IconButton  onClick={()=>{ setCatagorySelection('') ; setSearchSelection('') }}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
      }
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


export default function MasterDataTable({masterList,access,getMaterialInAction,tableName}){

  const dispatch = useDispatch();

  const [masterData, setMasterData] = React.useState([]);
  const [masterAccess,setMasterAccess] = React.useState(null);
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [actionAlert,setActionAlert] = React.useState(false);
  const [actionMode, setActionMode] = React.useState('');
  const [itemInAction,setItemInAction] = React.useState(null);

  const [catagorySelection, SetCatagorySelection] = React.useState('')
  const [searchSelection,setSearchSelection] = React.useState('')

  const [materialList,setMaterialList] = React.useState([]);
  const [optionsDiable,setOptionsDisable] = React.useState(false);

  React.useEffect(() => {
    setMasterData(masterList);
  },[masterList])

  React.useEffect(() => {
    setMasterAccess(access);
  },[access])

  // Update RawMaterial Based On SearchQuery || catagorySelection || Materials Base Data (Redux)
  React.useEffect(()=>{

      if(catagorySelection.length > 0 && searchSelection.length === 0){
          const filteredData = masterData.filter(item=>item.category === catagorySelection);
          setMaterialList(filteredData);
      }else if(catagorySelection.length === 0 && searchSelection.length > 0){
          const filteredData = masterData.filter(item=> item.category.includes(searchSelection));
          setMaterialList(filteredData);
      }else if(catagorySelection.length > 0 && searchSelection.length > 0){
          const filteredData = masterData
                                    .filter(item=> item.category === catagorySelection)
                                    .filter(item=> item.category.includes(searchSelection));
          setMaterialList(filteredData);
      }else if(catagorySelection.length === 0 && searchSelection.length === 0){
          setMaterialList(masterData); 
      }
  },[searchSelection,catagorySelection,masterData]);

  // Update Action Releated Things ( Avoid Model Escapes )
  React.useEffect(()=>{
    if(!actionAlert){
      setActionMode('');
      setItemInAction(null);
    }
  },[actionAlert]);

  // Set & Release User Options ( Avoid Unwanted User Actions )
  React.useEffect(()=>{
    if(selected.length > 0 && optionsDiable === false){
      setOptionsDisable(true);
    }else if(selected.length === 0 && optionsDiable === true){
      setOptionsDisable(false);
    }
  },[selected]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log('handleSelectAllClick');
    if (event.target.checked) {
      const newSelected = materialList.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.log('handleClick');
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const editMaterialQty = id => {
      const [ focusedItem ] = masterData?.filter(item => item.id === id); 
      setActionAlert(true);
      setActionMode('edit');
      setItemInAction(focusedItem);
  }

  const confirmUpdateEdit = async() => {
      
        const filterList = masterData?.filter(item => item.id !== itemInAction.id); 
        const updatedMaterials = [itemInAction,...filterList];
        masterAccess ?  dispatch(setRawMaterialList(updatedMaterials)) : dispatch(setBillingItemList(updatedMaterials));
        setActionAlert(false);
        setSelected([]);
  }

  const removeMaterialItem = id => {
    const [ focusedItem ] = masterData?.filter(item => item.id === id); 
      setItemInAction(focusedItem);
      setActionAlert(true);
      setActionMode('delete');
  } 

  const confirmDelete = () =>{
    const updatedMaterials = masterData?.filter(item => item.id !== itemInAction.id);
    masterAccess ?  dispatch(setRawMaterialList(updatedMaterials)) : setMasterData(updatedMaterials);
    setActionAlert(false);
  }

  const closeActionAlert = () =>{
    setActionAlert(false);
    setActionMode('');
    setItemInAction(null);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - materialList.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(materialList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage,materialList],
  );


 
  return (
    <React.Fragment>
      <Modal
          open={actionAlert}
          // onClose={() => setActionAlert(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
 
            <Box sx={styledModel}>
              {actionMode==='delete' ? (<>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb:3}}>
                    {`Are you sure you want to delete the item from list?`}
                  </Typography>         
                  <Grid container justifyContent="flex-end" spacing={1}>
                        <Box  sx={{mt:1}}>
                          <Button variant="contained" sx={{m:1,mr:2}} onClick={()=>{confirmDelete()}}>delete</Button>
                          <Button variant="contained" onClick={() => setActionAlert(false)}>cancel</Button>
                        </Box>
                  </Grid>
                </>) : (<>
                  <Grid container spacing={4}>

                      <Grid item xs={12} >
                          <Typography variant="p" gutterBottom textAlign='center'>
                              நீங்கள் மாற்றம் செய்ய விரும்பிய பொருளின் விவரம் :
                          </Typography>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="productName"
                          name="productName"
                          label="பொருள் பெயர்"
                          fullWidth
                          autoComplete="given-name"
                          variant="standard"
                          value={itemInAction?.name}
                          onChange={(e)=>{setItemInAction({...itemInAction, name : e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                            // disabled={ ( itemInAction.category || itemInAction.qtyType ) ? false : true }
                            required
                            id="price"
                            name="price"
                            type="number"
                            label={`1 ${itemInAction?.qtyType === 'kg'? 'கிலோவுக்கான' : 'லிட்டருக்கான' } பொருளின் விலை`}
                            fullWidth
                            variant="standard"
                            value={itemInAction?.price}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                            onChange={(e)=>{setItemInAction({...itemInAction, price : parseInt(e.target.value)})}}
                          />
                        
                      </Grid>
                      <Grid container justifyContent="flex-end" spacing={1}>
                        <Box  sx={{mt:2}}>
                          <Button 
                            variant="contained"
                            sx={{m:2,mr:2}}
                            onClick={confirmUpdateEdit}
                            >
                            update
                          </Button>
                          <Button variant="contained" onClick={closeActionAlert}>cancel</Button>
                          </Box>
                      </Grid>
                  </Grid>
              </>)      
              }  
            </Box>
       
      </Modal>

        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar 
                numSelected={selected.length} 
                catagorySelection={catagorySelection} 
                setCatagorySelection={SetCatagorySelection}
                searchSelection={searchSelection}
                setSearchSelection={setSearchSelection}
                optionsDiable={optionsDiable}
                masterAccess={masterAccess}
                tableName={tableName}
            />
            <TableContainer>
            <Divider />
              <Table
                sx={{ minWidth: masterAccess? 750 : 650 }}
                aria-labelledby="tableTitle"
                // size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={materialList.length}
                  materialList={materialList}
                  setMaterialList={setMaterialList}
                  masterAccess={masterAccess}
                />
     
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const id = masterAccess ? row.id : row.id;
                    const isItemSelected = isSelected(id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                  
                    return (
                            <TableRow
                              hover
                              // onClick={(event) => handleClick(event, id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={id}
                              selected={isItemSelected}
                              sx={{ cursor: 'pointer'}}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  onClick={(event) => handleClick(event, id)}
                                  color="primary"
                                  align="right"
                                  checked={isItemSelected}
                                  sx={{pl:5}}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                               
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                align="center"
                              >
                                {row.name}
                              </TableCell>
                              {masterAccess === true ? (<>
                                <TableCell align="left">{id}</TableCell>
                                <TableCell align="left">{row.qtyType}</TableCell>
                                <TableCell align="left">{row.category}</TableCell>
                                </>) : (<><TableCell align="left">{`${row.qty} ${row.qtyType}`}</TableCell></>)
                              }
                              
                              <TableCell align="left">{row.price}</TableCell>
                              <TableCell align="left">
                                <IconButton disabled={optionsDiable} onClick={()=> {access? editMaterialQty(id) : getMaterialInAction([id,row,'edit'])}} >
                                  <DriveFileRenameOutlineIcon  />
                                </IconButton>
                              </TableCell>
                              <TableCell align="left">
                              {/* onClick={()=>removeItemFromMaterialList(item.id)} */}
                                <IconButton disabled={optionsDiable} onClick={()=> {access? removeMaterialItem(id) : getMaterialInAction([id,row,'delete'])}} >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              // sx={{display: 'flex', alignItems: 'center'}}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={materialList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
        </Box>
    </React.Fragment>
  )
}


                    // if(masterAccess === true){
                    //     return (
                    //         <TableRow
                    //           hover
                    //           onClick={(event) => handleClick(event, row.id)}
                    //           role="checkbox"
                    //           aria-checked={isItemSelected}
                    //           tabIndex={-1}
                    //           key={row.id}
                    //           selected={isItemSelected}
                    //           sx={{ cursor: 'pointer'}}
                    //         >
                    //           <TableCell padding="checkbox">
                    //             <Checkbox
                    //               onClick={(event) => handleClick(event, row.id)}
                    //               color="primary"
                    //               align="right"
                    //               checked={isItemSelected}
                    //               sx={{pl:5}}
                    //               inputProps={{
                    //                 'aria-labelledby': labelId,
                    //               }}
                               
                    //             />
                    //           </TableCell>
                    //           <TableCell
                    //             component="th"
                    //             id={labelId}
                    //             scope="row"
                    //             padding="none"
                    //             align="center"
                    //           >
                    //             {row.name}
                    //           </TableCell>
                    //           <TableCell align="left">{row.id}</TableCell>
                    //           <TableCell align="left">{row.category}</TableCell>
                    //           <TableCell align="left">{row.qtyType}</TableCell>
                    //           <TableCell align="left">{row.price}</TableCell>
                    //           <TableCell align="left">
                    //             <IconButton disabled={optionsDiable} onClick={()=>editMaterialQty(row.id)}>
                    //               <DriveFileRenameOutlineIcon  />
                    //             </IconButton>
                    //           </TableCell>
                    //           <TableCell align="left">
                    //           {/* onClick={()=>removeItemFromMaterialList(item.id)} */}
                    //             <IconButton disabled={optionsDiable} onClick={()=>removeMaterialItem(row.id)} >
                    //               <DeleteIcon />
                    //             </IconButton>
                    //           </TableCell>
                    //         </TableRow>
                    //       );
                    // }
                    // else{
                    //     return (
                    //         <TableRow
                    //           hover
                    //           onClick={(event) => handleClick(event, row.id)}
                    //           role="checkbox"
                    //           aria-checked={isItemSelected}
                    //           tabIndex={-1}
                    //           key={row.id}
                    //           selected={isItemSelected}
                    //           sx={{ cursor: 'pointer'}}
                    //         >
                    //           <TableCell padding="checkbox">
                    //             <Checkbox
                    //               onClick={(event) => handleClick(event, row.id)}
                    //               color="primary"
                    //               align="right"
                    //               checked={isItemSelected}
                    //               sx={{pl:5}}
                    //               inputProps={{
                    //                 'aria-labelledby': labelId,
                    //               }}
                               
                    //             />
                    //           </TableCell>
                    //           <TableCell
                    //             component="th"
                    //             id={labelId}
                    //             scope="row"
                    //             padding="none"
                    //             align="center"
                    //           >
                    //             {row.name}
                    //           </TableCell>
                    //           <TableCell align="left">{row.category}</TableCell>
                    //           <TableCell align="left">{row.price}</TableCell>
                    //           <TableCell align="left">
                    //             <IconButton disabled={optionsDiable} onClick={()=>editMaterialQty(row.id)}>
                    //               <DriveFileRenameOutlineIcon  />
                    //             </IconButton>
                    //           </TableCell>
                    //           <TableCell align="left">
                    //           {/* onClick={()=>removeItemFromMaterialList(item.id)} */}
                    //             <IconButton disabled={optionsDiable} onClick={()=>removeMaterialItem(row.id)} >
                    //               <DeleteIcon />
                    //             </IconButton>
                    //           </TableCell>
                    //         </TableRow>
                    //       );
                    // }