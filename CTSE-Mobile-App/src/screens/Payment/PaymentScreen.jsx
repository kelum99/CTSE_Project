import React from "react";
import {SafeAreaView, View} from "react-native";
import { Button, Text, Card, TextInput  } from "react-native-paper";
import RcFieldForm from "rc-field-form";


const PaymentScreen = () => {
    const [form] = RcFieldForm.useForm();

    const onSubmit = (values) => {
        console.log("ss", values);
    };

    return (
        <SafeAreaView style={{alignItems: 'center'}} >
            <center>
            <Text variant="headlineLarge">Payment</Text>
            </center>

            <br /><br/>

            <Card style={{width: '90%', flex: 1, justifyContent: 'center'}}>
                <Card.Cover style={{marginBottom:10}} source={{ uri: 'https://picsum.photos/700' }} />

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
                        rules={[{ required: true }]}
                        name="CardHolderName"
                        trigger={"onChangeText"}
                        validateTrigger={"onChangeText"}
                    >
                <TextInput
                    style={{
                        marginBottom: 10,
                        width: '80%',
                        height: 50,
                        borderRadius: 10,
                        alignSelf: 'center',
                        textAlign: 'center',
                }}
                    mode="outlined"
                    label="Card Holder Name"
                    placeholder="Type something"
                />
                    </RcFieldForm.Field>


                    <RcFieldForm.Field
                        rules={[{ required: true }]}
                        name="CardNumber"
                        trigger={"onChangeText"}
                        validateTrigger={"onChangeText"}
                    >
                <TextInput
                    style={{
                        marginBottom: 10,
                        width: '80%',
                        height: 50,
                        borderRadius: 40,
                        alignSelf: 'center',
                        textAlign: 'center',
                }}
                    mode="outlined"
                    label="Card Number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    keyboardType="numeric"
                />
                    </RcFieldForm.Field>

                    <RcFieldForm.Field
                        rules={[{ required: true }]}
                        name="ExDate"
                        trigger={"onChangeText"}
                        validateTrigger={"onChangeText"}
                    >
                <TextInput
                    style={{
                        marginBottom: 10,
                        width: '80%',
                        height: 50,
                        borderRadius: 10,
                        alignSelf: 'center',
                        textAlign: 'center',
                    }}
                    mode="outlined"
                    label="Ex Date"
                    placeholder="xx/xx"
                />
                    </RcFieldForm.Field>

                    <RcFieldForm.Field
                        rules={[{ required: true }]}
                        name="CVV"
                        trigger={"onChangeText"}
                        validateTrigger={"onChangeText"}
                    >
                <TextInput
                    style={{
                        marginBottom: 10,
                        width: '80%',
                        height: 50,
                        borderRadius: 10,
                        alignSelf: 'center',
                        textAlign: 'center',
                        placeholderTextColor: 'red',

                    }}
                    mode="outlined"
                    label="CVV"
                    placeholder="XXX"
                />
                    </RcFieldForm.Field>
                </RcFieldForm>
                <Card.Actions>

                    <Button
                        onPress={() => form.submit()}
                        mode="contained"
                        style={{ marginVertical: 10 }}>Ok</Button>
                </Card.Actions>
            </Card>

        </SafeAreaView>
    );
};

export default PaymentScreen;
