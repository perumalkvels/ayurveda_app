import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginStatus : false,
}

    export const loginSlice = createSlice({
        name : 'loginStatus',
        initialState,
        reducers : {
            isLogged : (state) =>{
                state.loginStatus = !state.loginStatus
            },
        },
    })

    export const { isLogged,notIsLogged } = loginSlice.actions

    export default loginSlice.reducer