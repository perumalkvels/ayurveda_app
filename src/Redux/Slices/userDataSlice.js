import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    isLogged : false,
    userData : {},
}

    export const userDataSlice = createSlice({
        name : 'userDataSlice',
        initialState,
        reducers : {
            setIsLogged : (state,action) =>{
                state.isLogged = action.payload;
            },
            setUserData : (state,action) => {
                state.userData = action.payload;
            }
        },
    })

    export const { setIsLogged,setUserData } = userDataSlice.actions;

    export default userDataSlice.reducer;