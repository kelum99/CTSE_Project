import * as React from "react";
import { View, SafeAreaView, Text } from "react-native";
import { List } from "react-native-paper";

const FAQ = () => (
  <SafeAreaView
    style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
  >
    <List.AccordionGroup>
      <View style={{ margin: 10 }}>
        <List.Accordion
          style={{
            padding: 10,

            backgroundColor: "#cccfcd",
            borderRadius: 20,
          }}
          title="How do I place an order?"
          id="1"
        >
          <List.Item title="To place an order, select the fruit or fruits" />
          <List.Item title="Add them to your cart & Proceed to Pay" />
          <List.Item title="Once confirmed, order will be shipped" />
        </List.Accordion>
      </View>
      <View style={{ margin: 10 }}>
        <List.Accordion
          style={{
            padding: 10,

            backgroundColor: "#cccfcd",
            borderRadius: 20,
          }}
          title="What payment methods available?"
          id="2"
        >
          <List.Item title="Visa, Mastercard, and American Express" />
          <List.Item title="PayPal, Google Pay, and Apple Pay." />
        </List.Accordion>
      </View>
      <View style={{ margin: 10 }}>
        <List.Accordion
          style={{
            padding: 10,

            backgroundColor: "#cccfcd",
            borderRadius: 20,
          }}
          title="Do you give discounts for bulk orders?"
          id="3"
        >
          <List.Item title="Yes, we offer discounts for bulk orders." />
          <List.Item title="Please contact our customer support" />
        </List.Accordion>
      </View>
    </List.AccordionGroup>
  </SafeAreaView>
);

export default FAQ;
