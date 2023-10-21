import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({onFinish}) => {
  const [name, setName] = useState("");
  const handleOnChangeText = (text) => {
    setName(text);
  };
  const handleSubmit = async()=>{
    const user={name:name}
    // saving user inside  storage
     await AsyncStorage.setItem('user', JSON.stringify(user) )
     if(onFinish) onFinish()
  }
  // console.log(name);
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.textTitle}>Enter Your Name to Continue..</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Enter Your Name"
          value={name}
          onChangeText={handleOnChangeText}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
        ) : null}
      </View>
    </>
  );
};

export default Intro;

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textinput: {
    borderWidth: 2,
    borderColor: "gray",
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 24,
    fontSize: 17,
    color: "gray",
    fontStyle: "italic",
    marginBottom: 15,
  },
  textTitle: {
    alignSelf: "flex-start",
    paddingLeft: 24,
    marginBottom: 5,
    fontSize: 17,
    opacity: 0.4,
    fontStyle: "italic",
  },
});
