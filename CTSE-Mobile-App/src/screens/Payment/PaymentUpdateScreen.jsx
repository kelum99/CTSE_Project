import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, Card, TextInput } from "react-native-paper";
import RcFieldForm from "rc-field-form";
import {
  updatePaymentCustomer,
  getPaymentCustomerById,
} from "../../services/PaymentService";

const UpdatePaymentScreen = ({ navigation, route }) => {
  const [form] = RcFieldForm.useForm();
  const [payment, setPayment] = useState({});

  useEffect(() => {
    // Fetch payment details based on the ID passed in through the navigation route
    const fetchPaymentDetails = async () => {
      const res = await getPaymentCustomerById(route.params.paymentId);
      setPayment(res);
    };
    fetchPaymentDetails();
  }, []);

  const onSubmit = async (values) => {
    const res = await updatePaymentCustomer(payment.id, values);
    if (res) {
      navigation.navigate("PayListScreen");
    }
  };

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <center>
        <Text variant="headlineLarge">Update Payment</Text>
      </center>

      <br />
      <br />

      <Card style={{ width: "90%", flex: 1, justifyContent: "center" }}>
        <Card.Cover
          style={{ marginBottom: 10 }}
          source={{
            uri: "https://img.freepik.com/free-vector/realistic-monochromatic-credit-card_52683-74366.jpg?w=2000",
          }}
        />

        <RcFieldForm
          onFinishFailed={(value) => {
            console.log("errors", value.errorFields);
          }}
          component={View}
          form={form}
          initialValues={payment} // Set the initial values of the form to the fetched payment details
          onFinish={(values) => {
            onSubmit(values);
          }}
        >
          <RcFieldForm.Field
            rules={[{ required: true }]}
            name="CardHolderName"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 10,
                alignSelf: "center",
                textAlign: "left",
              }}
              mode="outlined"
              label="Card Holder Name"
              placeholder="Enter Name"
            />
          </RcFieldForm.Field>

          <RcFieldForm.Field
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  if (!/^\d+$/.test(value)) {
                    return Promise.reject(
                      new Error("Please enter only numbers")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            name="CardNumber"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 40,
                alignSelf: "center",
                textAlign: "center",
              }}
              mode="outlined"
              label="Card Number"
              placeholder="XXXX XXXX XXXX XXXX"
              keyboardType="numeric"
            />
          </RcFieldForm.Field>

          <RcFieldForm.Field
            rules={[{ required: true }]}
            name="ExpiryDate"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 40,
                alignSelf: "center",
                textAlign: "center",
              }}
              mode="outlined"
              label="ExpiryDate"
              placeholder="XXXX XXXX XXXX XXXX"
              keyboardType="numeric"
            />
          </RcFieldForm.Field>

          <RcFieldForm.Field
            rules={[{ required: true }]}
            name=""
          ></RcFieldForm.Field>

          <RcFieldForm.Field
            rules={[{ required: true }]}
            name="CVV"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 10,
                alignSelf: "center",
                textAlign: "left",
                placeholderTextColor: "red",
              }}
              mode="outlined"
              label="CVV"
              placeholder="XXX"
            />
          </RcFieldForm.Field>
        </RcFieldForm>
        <Card.Actions>
          <Button
            onPress={onUpdate}
            mode="contained"
            tyle={{ marginVertical: 10 }}
          >
            Update
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};
export default UpdatePaymentScreen;
