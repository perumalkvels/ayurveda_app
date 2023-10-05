import { createSlice } from '@reduxjs/toolkit';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
} from "firebase/auth";
import { setAppTheme } from './appSlice';
import { auth, database} from '../../Firebase/firebaseConfig';
import { ref, set, onValue } from "firebase/database";
import { setUserData,setIsLogged } from './userDataSlice';
const initialState = {

    isRegistered : false,

    loginData : {},

    registerData : {},

}

    export const userAuthSlice = createSlice({
        name : 'userAuthSlice',
        initialState,
        reducers : {
            setIsRegistered : (state,action) =>{
                state.isRegistered = action.payload;
            },
            setLoginData : (state,action) => {
                state.loginData = action.payload;
            },
            setRegisterData : (state,action) => {
                state.registerData = action.payload;
            }
        },
    })

    export const loginUser = loginData => async dispatch => {
            console.log('loginData', loginData);
            const {email,password} = loginData;
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user',user);
                const userData =  ref(database,'userDetails/' + user.uid );
                    onValue(userData,(snapshot) => {
                        const data = snapshot.val();
                        dispatch(setUserData({
                            uid : user.uid,
                            mobile : data.phoneNumber,
                            userName : data.userName, 
                        }));
                        dispatch((setIsLogged(true)));
                        return data;
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+ " " + errorMessage);
            });
    }

    export const registerUser = registerData => async dispatch => {
        console.log(registerData);
        console.log('DB',database);
        const {firstName,lastName, mobile,email,password} = registerData;

        createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'userDetails/' + user.uid), {
                phoneNumber: mobile,
                userName:  firstName.toLowerCase().trim()+lastName.toLowerCase().trim(),
              });
              console.log('success'); 
            // database.ref(`userDetails/${user.uid}`).set({
            //     phoneNumber: mobile,
            //     userName:  firstName.toLowerCase().trim()+lastName.toLowerCase().trim(),
            //   })
            // user.updateProfile({
            //     displayName:  firstName.toLowerCase().trim()+lastName.toLowerCase().trim(),
            //     phoneNumber: mobile,
            // });

            console.log("Register Successfully");
            console.log('user',user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode+ " " + errorMessage);
        });

    }

    export const signOutUser =  async dispatch =>{
        console.log('signOut Function called');
        signOut(auth).then(() => {

            dispatch(setUserData({}));
            dispatch(setIsLogged(false));
            dispatch(setAppTheme('light'));
            console.log('Logout Successfully');

          }).catch((error) => {
            console.log('Error Logout ',error.message );
          });
    }

    export const { setIsRegistered,setLoginData,setRegisterData } = userAuthSlice.actions;

    export default userAuthSlice.reducer;