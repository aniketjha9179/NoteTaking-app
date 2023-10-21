
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../context/NoteProvider";
import NoteInputModel from "./NoteInputModel";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${day}/${month}/${year}-${hrs}:${min}:${sec}`;
};

const NoteDetails = (props) => {
  // const { note } = props.route.params;
  const [note,setNote] =useState(props.route.params.note)
  const navigation = useNavigation(); // Get the navigation object
  const headerHeight = useHeaderHeight();
  const {setNotes} =useNotes()
  const [showModal,setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    // updates notes
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));

    navigation.goBack(); // Use the navigation object to navigate back
  }

  const displayDeleteAlert = () => {
    Alert.alert('Are You Sure!', 'This action will delete notes permanently', [
      {
        text: 'Delete',
        onPress: deleteNote
      },
      {
        text: 'No Thanks',
        onPress: () => console.log('no thanks')
      }
    ],
      {
        cancelable: true
      }
    )
  }
   const handleUpdate = async(title, desc, time)=>{
     
   const result =  await AsyncStorage.getItem('notes');
   let notes=[]
   if(result!==null) notes =  JSON.parse(result)
    
   const newNotes =  notes.filter(n=>{

      if(n.id===note.id){
        n.title=title
        n.desc=desc
        n.isUpdated=true
        n.time =time
        

        setNote(n);
      }
      return n;
     
   } )
   setNotes(newNotes);
   await AsyncStorage.setItem('notes', JSON.stringify(newNotes))

   };

   const handleOnClose=()=>setShowModal(false)
   const openEditModal =()=>{
    setIsEdit(true);
    setShowModal(true);

   }

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>
          {note.isUpdated ?
          `updated at ${formatDate(note.time)}` 
           :
           ` ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}> {note.title} </Text>
        <Text style={styles.desc}> {note.desc} </Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          onPress={displayDeleteAlert}
          antIconName={"delete"}
          size={24}
          style={{ backgroundColor: "#AA1945" }}
        />
        <RoundIconBtn
          antIconName={"edit"}
          onPress={openEditModal }
          size={24}
        />
        <NoteInputModel 
        isEdit={isEdit}
        note={note}
         onClose={handleOnClose} 
        onSubmit={handleUpdate}
        visible={showModal}
        />
      </View>
    </>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "orange",
    fontWeight: "700",
  },
  desc: {
    fontSize: 20,
    opacity: 0.5,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.4,
    marginBottom: 10,
  },
  btnContainer: {
    position: "absolute",
    right: 14,
    bottom: 55,
    justifyContent: "space-between",
    gap: 20,
  },
  element: {},
});
