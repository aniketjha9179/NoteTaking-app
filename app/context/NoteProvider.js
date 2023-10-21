import { Text, View } from "react-native";
import React, { useContext, useEffect, useState, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteContext = createContext();
const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    //  console.log(result);
    if (result !== null) setNotes(JSON.parse(result));
  };
  useEffect(() => {
    // AsyncStorage.clear()
    findNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, setNotes, findNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);

export default NoteProvider;
