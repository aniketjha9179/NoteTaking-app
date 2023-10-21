// import {
//   FlatList,
//   Keyboard,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import colors from "../misc/colors";
// import SearchBar from "../components/SearchBar";
// import RoundIconBtn from "../components/RoundIconBtn";
// import NoteInputModel from "../components/NoteInputModel";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Note from "../components/Note";
// import { useNotes } from "../context/NoteProvider";
// import NotFound from "../components/NotFound";

// const NoteScreen = ({ user, navigation }) => {
//   const [greet, setGreet] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const { notes, setNotes,findNotes } = useNotes();
//   const [searchQuery, setSearchQuery] =useState('');
//   const [resultNotFound,setResultNotFound] = useState(false)

//   const findGreet = () => {
//     const hrs = new Date().getHours();
//     if (hrs === 0 || hrs < 12) {
//       return setGreet("Morining");
//     }
//     if (hrs === 1 || hrs < 17) {
//       return setGreet("Afternoon");
//     } else {
//       setGreet("Evening");
//     }
//   };

//   useEffect(() => {
//     // AsyncStorage.clear()
//     findGreet();
//   }, []);
//   const handleOnSubmit = async (title, desc) => {
//     // saving the  notes
//     const note = { id: Date.now(), title, desc, time: Date.now() };
//     const updatesNotes = [...notes, note];
//     setNotes(updatesNotes);
//     await AsyncStorage.setItem("notes", JSON.stringify(updatesNotes));
//   };
//   // opening notes
//   const openNote = (note) => {
//     navigation.navigate("NoteDetails", { note });
//   };
//   const handleOnSearchInput =async (text)=>{
//      setSearchQuery(text);
//      if(!text.trim()){
//       setSearchQuery('')
//       setResultNotFound(false);
//       return await findNotes()

//      }  
//      const filterNotes =  notes.filter(note=>{
//       if(note.title.toLowerCase().includes(text.toLowerCase())){
//         return note;
//       }else{
//         resultNotFound(true)
//       }
//      })
//      if(filterNotes.length){
//       setNotes([...filterNotes])
//      }


//   }

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.container}>
//           <Text style={styles.header}>{`Good ${greet} ${user.name} `} </Text>
//           {/* IF THERE IS NOTES PRESENT THEN SHOWING
//           SEARCHBAR IF NOT THEN NOTHING TO SHOW  */}
//           {notes.length ? (
//             <SearchBar value={searchQuery} onChangeText={handleOnSearchInput} containerStyle={{ marginVertical: 15 }} />
//           ) : null}
//           {resultNotFound ?<NotFound />: <FlatList
//             data={notes}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => (
//               <Note item={item} onPress={() => openNote(item)} />
//             )}
//             numColumns={2}
//             columnWrapperStyle={{
//               justifyContent: "space-between",
//               marginBottom: 25,
//             }}
//           />}
         
//           {!notes.length ? (
//             <View
//               style={[
//                 StyleSheet.absoluteFillObject,
//                 styles.emptyHeaderContainer,
//               ]}
//             >
//               <Text style={styles.emptyHeading}>Add Your Notes</Text>
//             </View>
//           ) : null}
//         </View>
//       </TouchableWithoutFeedback>
//       <RoundIconBtn
//         antIconName="plus"
//         style={styles.addBtn}
//         onPress={() => setModalVisible(true)}
//       />

//       <NoteInputModel
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onSubmit={handleOnSubmit}
//       />
//     </>
//   );
// };

// export default NoteScreen;

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     flex: 1,
//     zIndex: 1,
//   },
//   header: {
//     fontSize: 25,
//     fontWeight: "bold",
//   },
//   emptyHeaderContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     zIndex: -1,
//   },
//   emptyHeading: {
//     fontSize: 24,
//     textTransform: "uppercase",
//     fontWeight: "bold",
//     opacity: 0.3,
//   },
//   addBtn: {
//     position: "absolute",
//     right: 15,
//     bottom: 50,
//     zIndex: 20,
//   },
// });
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModel from "../components/NoteInputModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from 'react-native-animatable';

import Note from "../components/Note";
import { useNotes } from "../context/NoteProvider";
import NotFound from "../components/NotFound";

const reverseData= data=>{
  return data.sort((a, b)=>{
    const aInt=parseInt(a.time);
    const bInt=parseInt(b.time);
    if(aInt<bInt) return 1;
    if(aInt==bInt) return 0;
    if(aInt>bInt) return -1;
  });
}

const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { notes, setNotes, findNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs >= 0 && hrs < 12) {
      setGreet("Morning");
    } else if (hrs >= 12 && hrs < 17) {
      setGreet("Afternoon");
    } else {
      setGreet("Evening");
    }
  };

  useEffect(() => {
    findGreet();
  }, []);

const reverseNotes = reverseData(notes);


  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const openNote = (note) => {
    navigation.navigate("NoteDetails", { note });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }

    const filterNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(text.toLowerCase());
    });

    if (filterNotes.length) {
      setNotes(filterNotes);
      setResultNotFound(false);
    } else {
      setResultNotFound(true);
    }
  };
  const handleOnClear = async()=>{
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes()

  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null}
          {resultNotFound ? <NotFound /> : (
            <FlatList
              data={reverseNotes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Note item={item} onPress={() => openNote(item)} />
              )}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 25,
              }}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <View style={{ borderRadius:20}}>
              {/* <Image style={{height:900,width:400,}} source={{uri:'https://i.pinimg.com/originals/04/d6/93/04d6930ab0c145131cefa0a72626c152.gif'}} /> */}

              </View>
              <Animatable.Text 
              animation={'slideOutDown'}
              duration={3000}

              style={styles.emptyHeading}>Add Your Notes</Animatable.Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        antIconName="plus"
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      />

      <NoteInputModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  emptyHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // zIndex: -1 // You can remove this line if it's not needed.
  },
  emptyHeading: {
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.6,
    zIndex:1,
    position:'absolute'
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 20,
  },
});

