import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor : #eee
  paddingHorizontal:30px;
`;

const Logo = styled.Image`
  height: 25%;
  marginBottom: 10px;
`;

const Input = styled.TextInput`
  color: #444;
  paddingHorizontal: 20px;
  paddingVertical: 10px;
  borderRadius: 5px;
  border : 1px solid #CCC;
  backgroundColor: #FFF;
  alignSelf: stretch;
  marginBottom: 20px;
  fontSize: 16px;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #721c24;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Button = styled.TouchableHighlight`
  justifyContent: center;
  alignItems: center;
  borderRadius: 5px;
  backgroundColor: #0cb27a;
  alignSelf: stretch;
  marginTop: 10px;
  height : 45px;
`;

const ButtonText = styled.Text`
  color:  #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const SignUpLink = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
`;

const SignUpLinkText = styled.Text`
  color: #999;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

export {Container, Logo, Input, ErrorMessage, Button, ButtonText, SignUpLink, SignUpLinkText};