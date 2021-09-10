
// npm install axios
// https://moh1.com.br/spf/sis/_apps/app_teste/

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';


export default function getBaseUrl(){

    //var getUrl = "";
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

                var getUrl = "";
                AsyncStorage.getItem("address_url").then((value) => {
                    getUrl = value;
                    //console.log( getUrl);
                    global.api =  "" + getUrl +"";


                });

                console.log("'"+ global.api +"'");
                return global.api;
        }




    //export default api_meta;