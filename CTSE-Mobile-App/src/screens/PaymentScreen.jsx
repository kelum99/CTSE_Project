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
                <Card.Cover style={{marginBottom:10}} source={{ uri: 'https://picsum.photos/700' }} />

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

                <Card.Actions>

                    <Button mode="contained" onPress={(HomeScreen) => console.log('Pressed')}>Ok</Button>
                </Card.Actions>
            </Card>

        </SafeAreaView>
    );
};

export default PaymentScreen;
