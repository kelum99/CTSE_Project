import React, { useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import RcFieldForm from "rc-field-form";
import { Button, HelperText, TextInput } from "react-native-paper";

const ViewScreen = () => {
  return (
    <SafeAreaView>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
    </SafeAreaView>
  );
};
