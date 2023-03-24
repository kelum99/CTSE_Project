import React, { useRef, useState } from "react";
import { SafeAreaView, View, Image } from "react-native";
import RcFieldForm from "rc-field-form";
import { Button, HelperText, TextInput } from "react-native-paper";
import { AddProduct } from "../../services/SellerService";
import { useUserInfo, useEvents } from "../../services/Application";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
const AddProductScreen = ({ navigation }) => {
  const user = useUserInfo();
  const event = useEvents();
  const ref_name = useRef();
  const ref_price = useRef();
  const ref_description = useRef();
  const ref_quantity = useRef();

  const [form] = RcFieldForm.useForm();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const response = await fetch(image);
    const blobFile = await response.blob();
    const reference = ref(storage, `${Date.now()}.jpg`);
    const result = await uploadBytes(reference, blobFile);
    const url = await getDownloadURL(result.ref);
    return url;
  };

  const onSubmit = async (values) => {
    const url = await uploadImage();
    console.log("sss", url);
    const product = { ...values, userId: user.id, imgUrl: url };
    const res = await AddProduct(product);
    if (res) {
      event.emit("GET_ALL_FRUITS");
      event.emit("GET_PRODUCTS");
      navigation.navigate("ProductScreen");
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button onPress={pickImage}>Upload Image</Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
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
          name="name"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Name"}
            ref={ref_name}
            mode="outlined"
            placeholder={"Enter Name"}
          />
        </RcFieldForm.Field>

        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="price"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Price"}
            ref={ref_price}
            mode="outlined"
            placeholder={"Enter Price"}
          />
        </RcFieldForm.Field>

        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="description"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Description"}
            ref={ref_description}
            mode="outlined"
            placeholder={"Enter Description"}
          />
        </RcFieldForm.Field>

        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="quantity"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Quantity"}
            ref={ref_quantity}
            mode="outlined"
            placeholder={"Enter Quantity"}
          />
        </RcFieldForm.Field>
      </RcFieldForm>

      <Button
        style={{ marginVertical: 30 }}
        onPress={() => form.submit()}
        mode="contained"
      >
        Add Fruit
      </Button>
    </SafeAreaView>
  );
};

export default AddProductScreen;
