import axios from 'axios';
import * as Network from 'expo-network';

function getBaseUrl() {
    const protocolo = "http://";
    var url = protocolo + "";

    const Address = Network.getIpAddressAsync();

    return Address.then((ip) => {
        if (ip.substring(0, 3) == '177' || ip.substring(0, 3) == '192') {
            return `${url}192.168.0.151:8082/_apps/app_teste/`;
        } else {
            return `${url}177.66.8.74:8082/_apps/app_teste/`;
        }
    });
}

const api_sect = axios.create();

api_sect.defaults.timeout = 10000000;
api_sect.interceptors.request.use(
    async config => {
        config.baseURL = await getBaseUrl();
        alert(await getBaseUrl());
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

export default api_sect;


