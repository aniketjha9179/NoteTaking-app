import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";

const NoteInputModel = ({ visible, onClose, onSubmit, isEdit,note }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);
  // to save the text from input field
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };
  // console.log(title, desc);
  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    if(isEdit){
      // for edit 
      onSubmit(title, desc, Date.now());

    }else{

      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  // reseting and closing the modal on close press
  const closeModal = () => {
    if(!isEdit){

      setTitle("");
      setDesc("");
    }
    onClose();
  };

  return (
    <>
      {/* <StatusBar  hidden /> */}
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            style={[styles.input, styles.title]}
            placeholder="Title"
            value={title}
            onChangeText={(text) => handleOnChangeText(text, "title")}
          />

          <TextInput
            multiline
            style={[styles.input, styles.description]}
            placeholder="Words to note"
            onChangeText={(text) => handleOnChangeText(text, "desc")}
            value={desc}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              antIconName={"check"}
              size={18}
              onPress={handleSubmit}
            />
            {/* only showing cross sign when there is amy text there  */}
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                antIconName={"close"}
                size={18}
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>

        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModel;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    opacity: 0.7,
    fontSize: 20,
    color: "black",
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  description: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
  },
});
