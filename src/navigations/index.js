import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth";
import { UserContext } from "../contexts";
import Main from "./Main";

const Navigation = () => {
  const {user} = useContext(UserContext);
  return (
  <NavigationContainer>{user.uid ? <Main /> : <Auth />}</NavigationContainer>
  );
};

export default Navigation;