import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, AsyncStorage} from 'react-native';
import api from '../../services/api';
import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
} from './styles';


const Login = ({navigation}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {

        AsyncStorage.getItem('codigo').then(codigo => {
            if (codigo) {
                navigation.navigate('Menu');
                return false;
            }
        });
    }, []);

    const handleSignInPress = async () => {
        if (login.length === 0 || password.length === 0) {
            setError('Preencha usuário e senha para continuar!');
        } else {
            const dados = {login, password};

            await api.post('/login/index.php', {login, password})
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
