import React, { useContext, useState, useRef } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import { Button, Image, Input } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const LOGO =
  "https://firebasestorage.googleapis.com/v0/b/react-native-chat-1463b.appspot.com/o/logo.png?alt=media";

const Signin = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const refPassword = useRef(null);

  const _handleSigninBtnPress = () => {
    console.log("Sign in!");
  };
  const _handleSignupBtnPress = () => {
    console.log("Sign up!");
  };

  return (
    <KeyboardAwareScrollView 
      extraScrollHeight={25}
      contentContainerStyle={{flex: 1}}
      >
      <Container insets={insets}>
        <Image url={LOGO} />
        <Input
          label="Email"
          placeholder="이메일주소"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="비밀번호"
          returnKeyType="done"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onSubmitEditing={_handleSigninBtnPress}
        />
        <Button title="Sign in" onPress={_handleSigninBtnPress} />
        <Button
          title="or sign up"
          onPress={() => navigation.navigate("Signup")}
          containerStyle={{ marginTop: 0, backgroundColor: "transparent" }}
          textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signin;
