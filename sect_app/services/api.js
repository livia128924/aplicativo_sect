
// npm install axios
// https://moh1.com.br/spf/sis/_apps/app_teste/

import axios from 'axios';

const url = 'http://192.168.0.151:8082/_apps/app_teste/';


const api = axios.create({
    baseURL: url,
    headers: {                  
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8"                  
    },
});


export default api;