import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Dialog,
  Portal,
  IconButton,
} from "react-native-paper";
import { getAllPayments, deletePayment } from "../../services/PaymentService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
    padding: "2%",
  },
  card: {
    //width: "100%",
    paddingLeft: "2%",
    paddingRight: "4%",
    borderRadius: 20,
    elevation: 30,
    maxWidth: "100%",
  },
  button: {
    backgroundColor: "#db3917",
  },
  buttonText: {
    color: "#ffffff",
  },
});

const PayListScreen = ({ navigation }) => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    const payments = await getAllPayments();
    setPayments(payments);
    setLoading(false);
  };

  const handleUpdatePayment = (payment) => {
    setSelectedPayment(payment);
    navigation.navigate("UpdatePaymentScreen", { payment });
  };

  const handleDeletePayment = async (payment) => {
    const deleted = await deletePayment(payment.id);
    if (deleted) {
      setVisible(false);
      setSelectedPayment(undefined);
      fetchPayments();
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ paddingBottom: 10 }}>
      <Card style={styles.card}>
        <Card.Title title={item.CardHolderName} />
        <Card.Content>
          <Text>Card Number: {item.CardNumber}</Text>
          {/* <Text>Ex Date: {item.ExpiryDate}</Text>
          <Text>CVV: {item.CVV}</Text> */}
        </Card.Content>
        <Card.Actions>
          <Button
            style={styles.button}
            onPress={() => {
              setSelectedPayment(item);
              setVisible(true);
            }}
          >
            Delete
          </Button>

          <Button onPress={() => handleUpdatePayment(item)}>Update</Button>
          {/*<Button>*/}
          {/*    Update*/}
          {/*</Button>*/}
        </Card.Actions>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          onPress={() => navigation.navigate("PaymentScreen")}
          mode="contained"
          style={{ marginTop: 20 }}
        >
          Add Payment
        </Button>
      </View>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FlatList
          data={payments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
              <Text>No payments found.</Text>
            </View>
          )}
        />
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Delete Payment</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this card details?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => handleDeletePayment(selectedPayment)}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default PayListScreen;
