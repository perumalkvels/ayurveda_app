import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    productList : [   
        {           
        p_id: "p_20239301440",          
        name: "காயத்திருமேனி தைலம்",           
        category: "ointment",
        price: 0,   
        qtyType: 'pkg',         
        rawMaterials : [],          
        desc: "This Prooduct is Lorem and its more lorem",           
        image_url: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/Ayurvedic-herb-herb-turmeric-indian-spices-1296x728-header-1296x728.jpg?w=1155&h=1528",                     
        },           
        {    
        p_id: "p_20239301456",           
        name: "குமரி தைலம்",           
        category: "ointment", 
        price: 0,  
        qtyType: 'pkg',          
        rawMaterials : [],            
        desc: "This Prooduct is Lorem and its more lorem",              
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtc3UCAT4K0B6mneAhyqjwjkmaMlmN9n2sURt-J1roobjZT35ADJAljBSyTmnxvaYi934&usqp=CAU",                    
        },           
        {             
        p_id: "p_20239301460",             
        name: "சுவாசகச சிரப்",             
        category: "broth", 
        price: 0,    
        qtyType: 'pkg',          
        rawMaterials : [],             
        desc: "This Prooduct is Lorem and its more lorem",           
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0DSuMkyJ9HqY0m9O0aRxjrIM2DFIeTBtI-KgPrka2tvrsmCZy67MAnb7WZBKnvYn0hnM&usqp=CAU",             
               },           
        {             
        p_id: "p_202393014729",             
        name: "சிற்சுடர் தைலம்",             
        category: "ointment",
        price: 0,
        qtyType: 'pkg', 
        rawMaterials : [],     
        desc: "This Prooduct is Lorem and its more lorem",
        image_url: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/Ayurvedic-herb-herb-turmeric-indian-spices-1296x728-header-1296x728.jpg?w=1155&h=1528",                       
        }    
    ],      

    rawMaterialList : [	
        {
        id: 'r_2023930124645', 
        name: 'சுக்கு', 
        category: 'medicine', 
        qtyType: 'kg', 
        price: 1200
        },
        {
        id: 'r_202393012487', 
        name: 'வயம்பு', 
        category: 'medicine', 
        qtyType: 'kg', 
        price: 900
        },
        {
        id: 'r_2023930124839', 
        name: 'கொம்பரக்கு', 
        category: 'medicine', 
        qtyType: 'kg', 
        price: 2200,
        },
        {
        id: 'r_2023930124944', 
        name: 'கருஞ்சீரகம்', 
        category: 'medicine', 
        qtyType: 'kg', 
        price: 1400
        },
        {
        id: 'r_2023930125014', 
        name: 'தேவதாரம்', 
        category: 'medicine', 
        qtyType: 'kg', 
        price: 1600
        },
        {
        id: 'r_2023930125033', 
        name: 'மரமஞ்சள்', 
        category: 'medicine', 
        qtyType: 'kg', 
        price: 800
        },
        {
        id: 'r_2023930125239', 
        name: 'கருஞ்சூரைப்பட்டை', 
        category: 'medicine', 
        qtyType: 'kg', 
        price: 1500,
        },
        {
        id: 'r_202393013445', 
        name: 'மரக்கொடி வெற்றிலைச்சாறு', 
        category: 'herbal', 
        qtyType: 'ltr', 
        price: 1198 
        },
        {
        id: 'r_20239301395', 
        name: 'கெருடக்கொடி சாறு', 
        category: 'herbal', 
        qtyType: 'ltr', 
        price: 1400
        },
        {
        id: 'r_2023930131732', 
        name: 'தூய நல்லெண்ணெய்', 
        category: 'oilItems', 
        qtyType: 'ltr', 
        price: 600,
        },
        {
        id: 'r_2023930131747', 
        name: 'தேங்காய் எண்ணெய்', 
        category: 'oilItems', 
        qtyType: 'ltr', 
        price: 800
        }
    ],
      
    billingItemList:[],

    masterDataLock : true, 
    

}

    export const productSlice = createSlice({
        name : 'productSlice',
        initialState,
        reducers : {
            setProductList : (state,action) =>{
                state.productList = action.payload;
            },
            setRawMaterialList :  (state,action) =>{
                state.rawMaterialList = action.payload;
            },
            setMasterDataLock : (state,action) => {
                state.masterDataLock = action.payload;
            },
            setBillingItemList : (state,action) => {
                state.billingItemList = action.payload;
            }
        },
    })

    export const { setProductList,setRawMaterialList,setMasterDataLock,setBillingItemList } = productSlice.actions;

    export default productSlice.reducer;


// [
//     {
//         r_id : 'r_0001',
//         name : 'raw-1',
//         category : '',
//         price : 1200,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0002',
//         name : 'raw-2',
//         category : '',
//         price : 2000,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0003',
//         name : 'raw-3',
//         category : '',
//         price : 3000,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0004',
//         name : 'raw-4',
//         category : '',
//         price : 4000,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0005',
//         name : 'raw-5',
//         category : '',
//         price : 4500,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0006',
//         name : 'raw-6',
//         category : '',
//         price : 1500,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0007',
//         name : 'raw-7',
//         category : '',
//         price : 600,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0008',
//         name : 'raw-8',
//         category : '',
//         price : 300,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0009',
//         name : 'raw-9',
//         category : '',
//         price : 400,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
//     {
//         r_id : 'r_0010',
//         name : 'raw-10',
//         category : '',
//         price : 550,
//         desc: 'This Prooduct is Lorem and its more lorem concepts and react and mateiral ui'
//     },
// ],