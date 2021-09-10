import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, AsyncStorage} from 'react-native';
//import api from '../../services/api';
import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
} from './styles';
import * as Network from 'expo-network';
import axios from 'axios';
import getBaseUrl from '../../services/api';

const Login = ({navigation}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hasConnection,setHasConnection] = useState(null);
    const [getUrl,setGetUrl] = useState(null);

//   const ipAddress = async()=>{

//       await Network.getIpAddressAsync();
//     }
//     console.log(ipAddress);

const ip = async()=>{
  const { isConnected }= await Network.getNetworkStateAsync();
    if (isConnected === true) {
        //alert('usuario conectado');
    } else {
        alert('verifique sua conexao');
    }
}

useEffect(() => {
    ip();

    Network.getIpAddressAsync().then((v) => {
    //console.log(v);
        // api.post('http://www.sect.am.gov.br/app/index.php', {})
        // .then(function (response) {
        //     console.log("ok", response.data);
        //    ///const {status, msg} = response.data
        // })
        // .catch(function (error) {
        //     alert(error);
        // });
    });
        AsyncStorage.getItem('codigo').then(codigo => {
            if (codigo) {
                navigation.navigate('Menu');
                return false;
            }
        });
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

    }, []);

    // AsyncStorage.getItem("address_url").then((value) => {
    //     setGetUrl(value);
    // });
    // const url = "" + getUrl + "/_apps/app_teste/";
    // console.log(url);

    // const api = axios.create({

    // baseURL: url,
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "Authorization",
    //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
    //     "Content-Type": "application/json;charset=UTF-8"
    // },
    // });

    const handleSignInPress = async () => {
        if (login.length === 0 || password.length === 0) {
            setError('Preencha usuário e senha para continuar!');
        } else {
            const dados = {login, password};
                console.log("mano");
            await getBaseUrl().post('http://192.168.0.151:8082/_apps/app_teste/login/index.php', {login, password})
                .then(function (response) {
                    const {status, msg} = response.data;
                    const codigo = response.data.dados.painel_usuario_logado;

                    if (status === 'OK') {
                        AsyncStorage.setItem('codigo', codigo);
                        navigation.navigate('Menu');
                    } else {
                        setError(msg);
                    }
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Container>

                <Logo source={require('../../assets/SectVerde.png')} resizeMode="contain"/>
                <Input
                    placeholder="usuário"
                    value={login}
                    onChangeText={setLogin}
                    autoCapitalize="none"
                    autoCorrect={true}
                    placeholderTextColor="#999"
                />
                <Input
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />

                {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}

                <Button onPress={handleSignInPress}>
                    <ButtonText>Entrar</ButtonText>
                </Button>
            </Container>
        </SafeAreaView>
    );
}
export default Login;
