
// npm install axios
// https://moh1.com.br/spf/sis/_apps/app_teste/

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';


export async function  getBaseUrl(){

    var getUrl = "";
        var get_response="";
        axios.post('http://www.sect.am.gov.br/app/index.php', {})
        .then(function (response) {
            //console.log("ok", response.data);
            const ip = response.data;
            get_response = ip  ;

            AsyncStorage.setItem('address_url', get_response);
            //console.log("dfsd",get_response);

            // if (ip === 'http://192.168.0.151:8082') {
                //     const url = 'http://192.168.0.151:8082';

                // } else if (ip === 'http://177.66.8.74:8082') {
                    //     const url = 'http://177.66.8.74:8082';
                    // }
                })
                .catch(function (error) {
                    alert(error);
                });

            AsyncStorage.getItem("address_url").then((value) => {
                getUrl = value;
            });

            return "" + getUrl + "/api";
        }



    const api_metas = axios.create({
        baseURL: getBaseUrl(),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
            "Content-Type": "application/json;charset=UTF-8"
        },
    });

    export default api_metas;