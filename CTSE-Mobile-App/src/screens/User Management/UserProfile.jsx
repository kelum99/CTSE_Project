import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import {
  Avatar,
  Button,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import RcFieldForm from "rc-field-form";
import { useUserInfo } from "../../services/Application";
import { getUserById, updateUser } from "../../services/UserService";

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
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { admin, userId } = route.params;
  const [form] = RcFieldForm.useForm();

  const getUser = useCallback(async () => {
    setLoading(true);
    const res = await getUserById(admin ? userId : user.id);
    setDetails(res);
    setLoading(false);
  });

  const onSubmit = async (values) => {
    delete details.id;
    const updateValues = { ...details, ...values };
    const res = await updateUser(user.id, updateValues);
    if (res) {
      getUser();
      setEdit(false);
    }
  };

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
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View>
          {!admin && (
            <Button
              onPress={() => setEdit(!edit)}
              style={{ alignSelf: "flex-end" }}
            >
              {edit ? " Cancel" : "Edit"}
            </Button>
          )}
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
              {edit ? (
                <View>
                  <RcFieldForm
                    onFinishFailed={(value) => {
                      console.log("errors", value.errorFields);
                    }}
                    component={View}
                    form={form}
                    onFinish={(values) => {
                      onSubmit(values);
                    }}
                  >
                    <RcFieldForm.Field
                      initialValue={
                        details.role === "customer"
                          ? details.firstname
                          : details.name
                      }
                      rules={[{ required: true }]}
                      name={details.role === "customer" ? "firstname" : "name"}
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={
                          details.role === "customer" ? "First Name" : "Name"
                        }
                        mode="outlined"
                      />
                    </RcFieldForm.Field>
                    <RcFieldForm.Field
                      initialValue={
                        details.role === "customer"
                          ? details.lastname
                          : details.storeName
                      }
                      rules={[{ required: true }]}
                      name={
                        details.role === "customer" ? "lastname" : "shopName"
                      }
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={
                          details.role === "customer"
                            ? "Last Name"
                            : "Shop Name"
                        }
                        mode="outlined"
                      />
                    </RcFieldForm.Field>
                    <RcFieldForm.Field
                      initialValue={details.mobile}
                      rules={[{ required: true }]}
                      name="mobile"
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={"Mobile"}
                        mode="outlined"
                        keyboardType="number-pad"
                      />
                    </RcFieldForm.Field>
                    <RcFieldForm.Field
                      initialValue={details.address}
                      rules={[{ required: true }]}
                      name="address"
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={"Address"}
                        mode="outlined"
                      />
                    </RcFieldForm.Field>
                  </RcFieldForm>
                  <Button
                    onPress={() => form.submit()}
                    style={{ marginVertical: 30 }}
                    mode="contained"
                  >
                    Update
                  </Button>
                </View>
              ) : (
                <View>
                  <DetailText
                    lable={details.role === "customer" ? "First Name" : "Name"}
                    value={
                      details.role === "customer"
                        ? details.firstname
                        : details.name
                    }
                  />
                  <DetailText
                    lable={
                      details.role === "customer" ? "Last Name" : "Store Name"
                    }
                    value={
                      details.role === "customer"
                        ? details.lastname
                        : details.storeName
                    }
                  />
                  <DetailText lable={"E-mail"} value={details.email} />
                  <DetailText lable={"Mobile"} value={details.mobile} />
                  <DetailText lable={"Address"} value={details.address} />
                  <DetailText lable={"User Role"} value={details.role} />
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;
