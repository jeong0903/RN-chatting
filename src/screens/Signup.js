import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { Button, Image, Input, ErrorMessage } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signup } from "../firebase";
import { Alert } from "react-native";
import { validateEmail, removeWhitespace } from "../utils";
import { UserContext } from "../contexts";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 50px 20px;
`;

const DEFAULT_PHOTO =
  "https://firebasestorage.googleapis.com/v0/b/react-native-chat-1463b.appspot.com/o/user.png?alt=media";

const Signup = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordCk = useRef(null);
  const refDidMount = useRef(null);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordCk && !errorMessage)
      );
  }, [email, name, password, passwordCk, errorMessage]);

  useEffect(() => {
    if (refDidMount.current) {
      let error = "";
      if (!name) {
        error = "이름을 입력하세요";
      } else if (!email) {
        error = "email을 입력하세요";
      } else if (!validateEmail(email)) {
        error = "올바른 email 형식이 아닙니다.";
      } else if (password.length < 6) {
        error = "비밀번호는 6자리 이상입니다.";
      } else if (passwordCk !== password) {
        error = "비밀번호와 비밀번호 확인이 동일해야합니다.";
      } else {
        error = "";
      }
      setErrorMessage(error);
    } else {
      refDidMount.current = true;
    }
  }, [email, name, password, passwordCk]);

  const _handleSignupBtnPress = async () => {
    try {
      const user = await signup({ name, email, password, photo });
      setUser(user);
    } catch (e) {
      Alert.alert("Sign up Error", e.message);
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={25}>
      <Container>
        <Image showButton={true} url={photo} onChangePhoto={setPhoto} />
        <Input
          label="Name"
          placeholder="사용자 이름"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => refEmail.current.focus()}
          onBlur={() => setName(name.trim())}
          maxLength={12}
        />
        <Input
          ref={refEmail}
          label="Email"
          placeholder="이메일주소"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
          onBlur={() => setEmail(removeWhitespace(email))}
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
          onBlur={() => setPassword(removeWhitespace(password))}
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
          onBlur={() => setPasswordCk(removeWhitespace(passwordCk))}
        />
        <ErrorMessage message={errorMessage} />
        <Button
          title="Sign up"
          onPress={_handleSignupBtnPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
