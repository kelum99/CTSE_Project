import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Text } from "react-native-paper";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    card: {
        width: "90%",
        marginBottom: 20,
    },
    button:{
        backgroundColor: '#db3917',

    },
    buttonText:{
      color: '#ffffff',
    }

});

const PayListScreen = ({navigation}) => {
    const [payments, setPayments] = useState([
        {
            id: "1",
            cardHolderName: "John Wick",
            cardNumber: "XXXX XXXX XXXX 1234",
            exDate: "01/23",
            cvv: "123",
        },
        {
            id: "2",
            cardHolderName: "Jane Doe",
            cardNumber: "XXXX XXXX XXXX 5678",
            exDate: "12/24",
            cvv: "456",
        },
    ]);

    const handleDelete = (id) => {
        setPayments((prevPayments) =>
            prevPayments.filter((payment) => payment.id !== id)
        );
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title title={item.cardHolderName} />
            <Card.Content>
                <Text>Card Number: {item.cardNumber}</Text>
                <Text>Ex Date: {item.exDate}</Text>
                <Text>CVV: {item.cvv}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    style={styles.button}
                    onPress={() => handleDelete(item.id)}>
                    <Text style={styles.buttonText}>
                    Delete</Text></Button>
            </Card.Actions>
        </Card>
    );

    return (
        <SafeAreaView style={styles.container}>

            <Text style={{
                marginBottom: 10
            }}>Save Cards</Text>
            <View style={styles.content}>
                <Button
                    style={ {marginBottom: 40}}
                    onPress={() => navigation.navigate("PaymentScreen")}
                    mode="contained">Add Card</Button>
            <FlatList
                data={payments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            </View>
        </SafeAreaView>
    );
};

export default PayListScreen;
