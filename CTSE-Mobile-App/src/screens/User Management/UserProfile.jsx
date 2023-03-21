import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { useUserInfo } from "../../services/Application";
import { getUserById } from "../../services/UserService";

const DetailText = (props) => {
  return (
    <View style={{ marginVertical: 5 }}>
      <Text
        style={{
          color: "rgb(0, 110, 0)",
          fontWeight: "500",
          marginVertical: 4,
        }}
      >
        {props.lable}
      </Text>
      <Text style={{ fontWeight: "bold" }} variant="titleMedium">
        {props.value}
      </Text>
    </View>
  );
};

const UserProfile = ({ route }) => {
  const user = useUserInfo();
  const [details, setDetails] = useState();
  const { admin, userId } = route.params;

  const getUser = useCallback(async () => {
    const res = await getUserById(admin ? userId : user.id);
    setDetails(res);
  });
  useEffect(() => {
    getUser();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        flex: 1,
        paddingTop: 22,
      }}
    >
      {!admin && <Button style={{ alignSelf: "flex-end" }}>Edit</Button>}
      {details && (
        <View>
          <Avatar.Text
            style={{ alignSelf: "center", marginVertical: 16 }}
            size={132}
            label={
              details.role === "customer"
                ? details.firstname.charAt(0).toUpperCase()
                : details.name.charAt(0).toUpperCase()
            }
          />
          <DetailText
            lable={details.role === "customer" ? "First Name" : "Name"}
            value={
              details.role === "customer" ? details.firstname : details.name
            }
          />
          <DetailText
            lable={details.role === "customer" ? "Last Name" : "Store Name"}
            value={
              details.role === "customer" ? details.lastname : details.storeName
            }
          />
          <DetailText lable={"E-mail"} value={details.email} />
          <DetailText lable={"Mobile"} value={details.mobile} />
          <DetailText lable={"Address"} value={details.address} />
          <DetailText lable={"User Role"} value={details.role} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;
