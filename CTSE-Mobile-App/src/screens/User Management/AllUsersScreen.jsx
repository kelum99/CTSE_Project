import React, { useEffect, useState, useCallback } from "react";
import {
  List,
  Text,
  ActivityIndicator,
  IconButton,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { getAllUsers, deleteUser } from "../../services/UserService";

const AllUserScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState();
  const [visible, setVisible] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const usersX = await getAllUsers();
    setUsers(usersX);
    setLoading(false);
  };

  const onClose = () => {
    setSelectedUser(undefined);
    setVisible(false);
  };

  const onDelete = async () => {
    if (selectedUser) {
      const res = await deleteUser(selectedUser.id);
      if (res) {
        setVisible(false);
        getUsers();
        setSelectedUser(undefined);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <List.Section>
          {users.length > 0 ? (
            <View>
              {users.map((user) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 4,
                    paddingHorizontal: 8,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                    }}
                  >
                    <Text variant="titleMedium">
                      {user.role === "customer" ? user.firstname : user.name}
                    </Text>
                    <Text>{user.role}</Text>
                  </View>
                  <IconButton
                    icon="delete"
                    iconColor={"red"}
                    size={20}
                    onPress={() => {
                      setVisible(true);
                      setSelectedUser(user);
                    }}
                  />
                </View>
              ))}
            </View>
          ) : (
            <Text>No users</Text>
          )}
        </List.Section>
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={onClose}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure to remove this user ?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onClose}>Cancel</Button>
            <Button mode="contained" buttonColor="red" onPress={onDelete}>
              Remove
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default AllUserScreen;
