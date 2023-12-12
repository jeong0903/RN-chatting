import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { Button, Image, Input } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 50px 20px;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordCk = useRef(null);

  const _handleSignupBtnPress = () => {
    console.log("Sign up!");
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={25}>
      <Container>
        <Image />
        <Input
          label="Name"
          placeholder="사용자 이름"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => refEmail.current.focus()}
        />
        <Input
          ref={refEmail}
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
          returnKeyType="next"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onSubmitEditing={() => refPasswordCk.current.focus()}
        />
        <Input
          ref={refPasswordCk}
          label="PasswordCk"
          placeholder="비밀번호"
          returnKeyType="done"
          value={passwordCk}
          onChangeText={setPasswordCk}
          isPassword={true}
          onSubmitEditing={() => _handleSignupBtnPress}
        />
        <Button title="Sign up" onPress={_handleSignupBtnPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
