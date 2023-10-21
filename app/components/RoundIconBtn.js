import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../misc/colors";

const RoundIconBtn = ({ antIconName, size, color, style,onPress }) => {
  return (
    <AntDesign
      style={[styles.icon, { ...style }]}
      name={antIconName}
      size={size || 24}
      color={color || colors.DARK}
      onPress={onPress}
      
    />
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
  icon: { backgroundColor: "#A4E5E0",
    padding:15,
    borderRadius:50,
    elevation:5,
    
},
});
