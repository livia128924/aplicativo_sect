import React, { useState } from 'react';
import {View, SafeAreaView} from 'react-native';
import axios from 'axios';
import api from '../../services/api';
import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';


const Login = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  handleSignInPress = async () => {
    if (login.length === 0 || password.length === 0) {
      setError( 'Preencha usuário e senha para continuar!');
    }else{
      var dados ={ login, password};
      api.post('http://192.168.0.151:8082/_apps/app_teste/login/index.php', {login, password})
      .then(function (response) {
          //alert(post);
         
          const {status, msg}= response.data;
          console.log(status);
          
          if(status == 'OK'){

            navigation.navigate('HomeScreen');
            //alert(''); // imprimir o conteudo - alert(JSON.stringify(response))
          }else{
             setError(msg); 
          }
         })
         .catch(function (error) {
          alert(error); 
          //console.log(JSON.stringify(error));
         });
      }
    
  };

    return (
      <SafeAreaView style={{flex:1}}>
      <View style={{flex:1}}>
      <Container>

        <Logo source={require('../../assets/SectVerde.png')} resizeMode="contain" />
        <Input
          placeholder="nome.sobrenome"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
          autoCorrect={false}
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
      </View>
      </SafeAreaView>
    );
  }
  export default Login;