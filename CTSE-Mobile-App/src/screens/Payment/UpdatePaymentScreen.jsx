import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, TextInput, ActivityIndicator } from "react-native-paper";
import RcFieldForm from "rc-field-form";
import { usePaymentInfo } from "../../services/Application";
import { updatePayment, getPaymentById } from "../../services/PaymentService";

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
        {props.label}
      </Text>
      <Text style={{ fontWeight: "bold" }} variant="titleMedium">
        {props.value}
      </Text>
    </View>
  );
};

const UpdatePaymentScreen = ({ route }) => {
  //const payment = usePaymentInfo();
  const [form] = RcFieldForm.useForm();
  const [details, setDetails] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { paymentId } = route.params;
  const [payment, setPayment] = useState({});

  const getPayment = useCallback(async () => {
    setLoading(true);
    const res = await getPaymentById(payment ? paymentId : payment.id);
    setPayment(res);
    setDetails(res);
    setLoading(false);
  });

  const onSubmit = async (values) => {
    delete details.id;
    const updateValues = { ...details, ...values };
    const res = await updatePayment(payment.id, updateValues);
    if (res) {
      getPayment();
      setEdit(false);
    }
  };

  useEffect(() => {
    getPayment();
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
          {details && (
            <Button
              onPress={() => setEdit(!edit)}
              style={{ alignSelf: "flex-end" }}
            >
              {edit ? " Cancel" : "Edit"}
            </Button>
          )}
          {details && (
            <View>
              {/* <Avatar.Text
                style={{ alignSelf: "center", marginVertical: 16 }}
                size={132}
                label={
                  details.role === "customer"
                    ? details.firstname.charAt(0).toUpperCase()
                    : details.name.charAt(0).toUpperCase()
                }
              /> */}
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
                      initialValue={details.CardHolderName}
                      rules={[{ required: true }]}
                      name={"CardHolderName"}
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={"CardHolderName"}
                        mode="outlined"
                      />
                    </RcFieldForm.Field>
                    <RcFieldForm.Field
                      initialValue={details.CardNumber}
                      rules={[{ required: true }]}
                      name="CardNumber"
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={"CardNumber"}
                        mode="outlined"
                      />
                    </RcFieldForm.Field>
                    <RcFieldForm.Field
                      initialValue={details.ExpiryDate}
                      rules={[{ required: true }]}
                      name="ExpiryDate"
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={"ExpiryDate"}
                        mode="outlined"
                        keyboardType="number-pad"
                      />
                    </RcFieldForm.Field>
                    <RcFieldForm.Field
                      initialValue={details.CVV}
                      rules={[{ required: true }]}
                      name="CVV"
                      trigger={"onChangeText"}
                      validateTrigger={"onChangeText"}
                    >
                      <TextInput
                        style={{ marginVertical: 10 }}
                        label={"CVV"}
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
                    label={"CardHolderName"}
                    value={details.CardHolderName}
                  />
                  <DetailText label={"CardNumber"} value={details.CardNumber} />
                  <DetailText label={"ExpiryDate"} value={details.ExpiryDate} />
                  <DetailText label={"CVV"} value={details.CVV} />
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
export default UpdatePaymentScreen;
