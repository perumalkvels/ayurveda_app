import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    appTheme : 'light',

    alertState : {
        active : false,
        msg : '',
        response: '',
    }, 

}

export const appSlice = createSlice({
    name : 'appSlice',
    initialState,
    reducers : {
        setAppTheme : (state,action) =>{
        state.appTheme = action.payload;
        },
        setAlertState : (state,action) =>{
            state.alertState = action.payload;
        },
    },
})

export const { setAppTheme,setAlertState } = appSlice.actions;

export default appSlice.reducer;