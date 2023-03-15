import React from "react";
import { List, Text } from "react-native-paper";
import { SafeAreaView, View } from "react-native";

const AllUserScreen = () => {
  const listView = () => {
    return (
      <View>
        <Text>Full Name</Text>
        <Text>Other</Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      <List.Section>
        <List.Item title={listView} left={() => <List.Icon icon="folder" />} />
        <List.Item title={listView} left={() => <List.Icon icon="folder" />} />
      </List.Section>
    </SafeAreaView>
  );
};

export default AllUserScreen;
