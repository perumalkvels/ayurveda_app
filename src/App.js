import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
  Navigate,
} from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import AuthRoutes from './AuthRoutes';

import Dashboard from './Pages/App_Pages/Dashboard';
import AuthUser from './Pages/Auth_Pages/AuthUser';
import ErrorPage from './Components/errorpage';
import LoginPage from './Pages/Auth_Pages/LoginPage';
import RegisterPage from './Pages/Auth_Pages/RegisterPage';
import Home from './Pages/App_Pages/Home';

import Products from './Pages/App_Pages/Product';
import ShowProductPage from './Pages/App_Pages/ShowProductPage';
import AddProductPage from './Pages/App_Pages/AddProductPage';
import EditProductPage from './Pages/App_Pages/EditProductPage';

import Materials from './Pages/App_Pages/Material';
import ShowMaterialPage from './Pages/App_Pages/ShowMaterialPage';
import AddRawMaterialPage from './Pages/App_Pages/AddMaterialPage';
import EditMaterialPage from './Pages/App_Pages/EditMaterialPage';

import { useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import { AppThemeProvider } from './Theme';
import  StoreBilling  from './Pages/App_Pages/StoreBilling';
import textConverter from './Utilz/textConverter';
import CreateBillingPage from './Pages/App_Pages/CreateBillingPage';
import GenerateBilling from './Pages/App_Pages/GenerateBilling';
// import transliterator from 'kvz-transliteration';
// import * as inditrans from 'inditrans';
// import { translate, Translator, speak, singleTranslate, batchTranslate, languages, isSupported, getCode } from 'google-translate-api-x';
// import translate from 'google-translate-api-x';
// import Translator  from 'google-translate-api-x';
export default function App() {

  const { isLogged } = useSelector(state => state.userData);
  console.log('isLogged', isLogged);

  const input_str = 'கெருடக்கொடி சாறு' ;
  // const res =  translate(input_str, {to: 'en'});

  // console.log(res.text); //=> I speak English

  // console.log('function',textConverter('தூய நல்லெண்ணெய்'));



        return (
        <AppThemeProvider>
        <CssBaseline />
        <Router>
            <Routes>
            {/* <PageLoader /> */}
              {/* Private Dashboard Routes  */}
              <Route element={<PrivateRoutes isAuth={isLogged} />}>
                  <Route exact path='/' element={<Dashboard/>} >
                      <Route index element={<Navigate to="/home" replace />}/>
                      <Route path='home' element={<Home/>} />
                      <Route path='storebilling' element={<StoreBilling />} >
                          <Route index element={<Navigate to="/storebilling/createBilling" replace />} />
                          <Route path='createBilling' element={<CreateBillingPage />} /> 
                          <Route path='generteBilling' element={<GenerateBilling />} /> 
                          {/* <Route index={false} path='editProduct/:productId' element={<EditProductPage/>} /> */}
                      </Route>
                      <Route path='products' element={<Products/>} >
                          <Route index element={<Navigate to="/products/showproducts" replace />} />
                          <Route path='showproducts' element={<ShowProductPage/>} /> 
                          <Route path='addproduct' element={<AddProductPage/>} /> 
                          <Route index={false} path='editProduct/:productId' element={<EditProductPage/>} />
                      </Route>
                      <Route path='materials' element={<Materials/>} >
                          <Route index element={<Navigate to="/materials/showmaterials" replace />} />
                          <Route path='showmaterials' element={<ShowMaterialPage/>} /> 
                          <Route path='addmaterial' element={<AddRawMaterialPage/>} /> 
                          {/* <Route index={false} path='editProduct/:productId' element={<EditProductPage/>} /> */}
                      </Route>
                      <Route path='*' element={<ErrorPage/>} />
                  </Route>
              </Route>

              {/* User Auth Routes  */}
              <Route element={<AuthRoutes isAuth={isLogged} />}>
                <Route path='/auth' element={<AuthUser/>}>
                    <Route index element={<Navigate to="/auth/login" replace />} /> 
                    <Route path='login' element={<LoginPage/>}/>
                    <Route path='register' element={<RegisterPage/>}/>
                </Route>
              </Route>

              {/* For Error Routes  */}
              <Route path='*' element={<ErrorPage/>} />
            </Routes>
        </Router>
        </AppThemeProvider>
      );
    }



// const translator = new Translator({from: 'en', to: 'es', forceBatch: false, tld: 'es'});
// const cat =  translator.translate('cat');
// const dog =  translator.translate('dog');
// const birds =  translator.translate(['owl', 'hawk']);

// console.log(cat.text); // => 'gato'
// console.log(dog.text); // => 'perro'
// console.log([birds[0].text, birds[1].text]); // => '[ 'búho', 'halcón' ]'

  // let t = new transliterator();

  // let transliterated_output_a5 = t.transliterate_input(input_str);

  // console.log('transliterated_output_a5',transliterated_output_a5);
  // // console.log('',inditrans );

  // // async function test() {
  //   // Init needs to complete before Inditrans could be used
  //   await inditrans.init();
  
  //   const result = inditrans.transliterate(
  //                   "श्री॒ गु॒रु॒भ्यो नमः॒ । ह॒रिः॒ ओ३म् ॥",
  //                   inditrans.Script.devanagari,
  //                   inditrans.Script.tamil,
  //                   inditrans.Option.IgnoreVedicAccents + inditrans.Option.TamilSuperscripted
  //                 );
  //   return result;
  // }

  // console.log('test',test);
  

// const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     primary: {
//       ...amber,
//       ...(mode === 'dark' && {
//         main: amber[300],
//       }),
//     },
//     ...(mode === 'dark' && {
//       background: {
//         default: deepOrange[900],
//         paper: deepOrange[900],
//       },
//     }),
//     text: {
//       ...(mode === 'light'
//         ? {
//             primary: grey[900],
//             secondary: grey[800],
//           }
//         : {
//             primary: '#fff',
//             secondary: grey[500],
//           }),
//     },
//   },
// });

// const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // palette values for light mode
//           primary:blue,
//           divider: blue[400],
//           background: {
//             default:  '#fff',
//             paper: amber,
//           },
//           text: {
//             primary: grey[900],
//             secondary: grey[800],
//           },
//         }
//       : {
//           // palette values for dark mode
//           // primary: grey,
//           // divider: grey[800],
//           background: {
//             default: grey[900],
//             paper: grey,
//           },
//           text: {
//             primary: '#fff',
//             secondary: grey[500],
//           },
//         }),
//   },
// });


  // const appTheme = useSelector(state => state.appData.appTheme);

  // const colorMode = React.useMemo(
  //   () => ({
  //     // The dark mode switch would invoke this method
  //     toggleColorMode: () => {
  //       setMode((prevMode: PaletteMode) =>
  //         prevMode === 'light' ? 'dark' : 'light',
  //       );
  //     },
  //   }),
  //   [],
  // );

  // Update the theme only if the mode changes
  // const theme = React.useMemo(() => createTheme(getDesignTokens(appTheme)), [appTheme]);

