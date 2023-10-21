import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../misc/colors";

const Note = ({ item, onPress  }) => {
  const { title, desc } = item;

  return (
    <>
      
      <TouchableOpacity style={styles.container}
      onPress={onPress}
      >
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={3}>{desc}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Note;

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A4E5E0',
    width: width / 2 - 10,
    padding: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  title: {
    fontWeight: "900",
    fontSize: 16,
    color: colors.DARK,
  },
});
