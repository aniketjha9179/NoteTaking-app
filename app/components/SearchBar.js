import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import colors from "../misc/colors";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.searchbar]}
        placeholder="🔍 Search Here"
      />
      {value ? (
        <MaterialIcons
          name="cancel"
          size={25}
          color={"#010101"}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {},
  searchbar: {
    borderWidth: 0.6,
    borderColor: "black",
    marginTop: 10,
    height: 45,
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: 20,
    backgroundColor: "#F9F5F6",
    paddingLeft: 100,
    justifyContent:'center'
  },
  clearIcon:{
    position:'absolute', 
    right:6,
    marginTop:12, 
    padding:8,
    backgroundColor:'#A4E5E0',
    borderRadius:50,





  }
});
