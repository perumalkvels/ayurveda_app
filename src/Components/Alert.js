import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertState } from '../Redux/Slices/appSlice';
import { useTheme } from '@mui/material/styles';

export default function TransitionAlerts() {

    const {active,msg,response} = useSelector(state => state.appData.alertState);
    const dispatch = useDispatch();
    const {palette} = useTheme();
    
  return (
    <Box sx={{ width: '60%', position: 'fixed',m:'auto', top: 80, right: 250 }}>
      <Collapse in={active}>
        <Alert
          sx={{ mb: 2, color: palette[response]?.main, textAlign: 'center', m: 'auto'}}
          action={
            <IconButton
              // sx={{ color: '#ffffff' }} 
              aria-label="close"
              size="small"
              onClick={() => dispatch(setAlertState({active: false, msg: '', response:''}))}
            >
              <CloseIcon fontSize="inherit" color="palette.text.primary"/>
            </IconButton>
          }
        >
          {msg}
        </Alert>
      </Collapse>
    </Box>
  );
}