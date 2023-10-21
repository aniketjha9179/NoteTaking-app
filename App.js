import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Intro from "./app/screens/Intro";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteScreen from "./app/screens/NoteScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteDetails from "./app/components/NoteDetails";
import NoteProvider from "./app/context/NoteProvider";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");

    if(result===null) return setIsAppFirstTimeOpen(true);
    setUser(JSON.parse(result));

    setIsAppFirstTimeOpen(false)




    
    }
  useEffect(() => {
    findUser();
  }, []);
  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: "", headerTransparent: true }}
        >
          <Stack.Screen component={RenderNoteScreen} name="NoteScreen" />
          <Stack.Screen component={NoteDetails} name="NoteDetails" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
