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
 if(login.length === 0 || password.length === 0) {
      setError( 'Preencha usuário e senha para continuar!');
    }else{
      navigation.navigate('HomeScreen');
      //alert("error");
    }
    
  }

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