import React from "react";
import { SafeAreaView } from "react-native";

import { Button, List } from "react-native-paper";

const ViewScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button
        onPress={() => navigation.navigate("AddProductScreen")}
        mode="contained"
      >
        Add Fruit
      </Button>
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
      />
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
      />
    </SafeAreaView>
  );
};

export default ViewScreen;
