import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { app } from "../firebase";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import moment from "moment";

const getDateOrTime = (ts) => {
  const now = moment().startOf("day");
  const target = moment(ts).startOf("day");
  return moment(ts).format(now.diff(target, "day") > 0 ? "MM/DD" : "HH:mm");
};

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottem-width: 1px;
  border-color: ${({ theme }) => theme.itemBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.ItemDesc};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.itemTime};
`;

const ItemIcon = styled(Ionicons).attrs(({ theme }) => {
  name: "chevron-forward";
  size: 24;
  color: theme.ItemIcon;
})``;
const Item = React.memo(
  ({ item: { id, title, description, createdAt }, onPress }) => {
    console.log(id);

    return (
      <ItemContainer onPress={() => onPress({ id, title })}>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemDesc>{description}</ItemDesc>
        </ItemTextContainer>
        <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
        <ItemIcon />
      </ItemContainer>
    );
  }
);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ChannelList = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const DB = getFirestore(app);

  useEffect(() => {
    const collectionQuery = query(
      collection(DB, "channels"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setChannels(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <FlatList
        data={channels}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={(params) => navigation.navigate("Channels", params)}
          />
        )}
        keyExtractor={(item) => item["id"].toString()}
        windowSize={10}
      />
    </Container>
  );
};

export default ChannelList;
