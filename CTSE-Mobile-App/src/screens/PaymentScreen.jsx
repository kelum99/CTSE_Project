import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Text, Card, TextInput  } from "react-native-paper";

const PaymentScreen = () => {
    return (
        <SafeAreaView style={{alignItems: 'center'}} >
            <center>
            <Text variant="headlineLarge">Payment</Text>
            </center>

            <br /><br/>

            <Card style={{width: '90%', flex: 1, justifyContent: 'center'}}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

                <TextInput
                    mode="outlined"
                    label="Card Holder Name"
                    placeholder="Type something"
                />

                <TextInput
                    style={{
                        paddingHorizontal: 26,
                    }}

                    mode="outlined"
                    label="Card Number"
                    placeholder="Type"
                    keyboardType="numeric"
                />

                <TextInput
                    mode="outlined"
                    label="Ex Date"
                    placeholder="Type"
                />

                <TextInput
                    mode="outlined"
                    label="CVV"
                    placeholder="Type"
                />

                <Card.Actions>

                    <Button>Ok</Button>
                </Card.Actions>
            </Card>

        </SafeAreaView>
    );
};

export default PaymentScreen;
