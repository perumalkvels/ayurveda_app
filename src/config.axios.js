import axios from 'axios'



// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const API_URL = "https://jsonplaceholder.typicode.com";

const setUpAction = axios.create({
    baseURL: API_URL,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    // },
  })

class Apiservice {
    static get(path = ''){
        return setUpAction({
            method : 'GET',
            url : path,
        })
    }

    static post(path = '', data = {}){
        return setUpAction({
            method : 'POST',
            url : path,
            data,
        })
    }
}

export { Apiservice }