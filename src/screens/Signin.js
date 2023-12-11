import React, { useContext } from 'react';
import { ThemeContext } from "styled-components/native";
import styled from 'styled-components/native';
import {Button, Image} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Container = styled.View`
  flex : 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.background};
  padding: 0 20px;
  padding-top: ${({insets : {top}}) => top}px;
  padding-bottom: ${({insets : {bottom}}) => bottom}px;
`;

const LOGO = 
'https://firebasestorage.googleapis.com/v0/b/react-native-chat-1463b.appspot.com/o/logo.png?alt=media';

const Signin = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);

  return(
    <Container insets={insets}>
      <Image url={LOGO} />
      <StyledText>로그인하기</StyledText>
      <Button title='Sign in' onPress={() => console.log('Signin')} />
      <Button 
      title='or sign up' 
      onPress={() => navigation.navigate('Signup')} 
      containerStyle={{marginTop: 0, backgroundColor: 'transparent'}}
      textStyle={{color: theme.btnTextLink, fontSize:18}}
      />
    </Container>
  );
};

export default Signin;