import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from "react-native";

const NoteCard = ({
  noteItem,
  setCurrentPage,
  setSelectedNote,
  deleteNote,
}) => {
  const styles = StyleSheet.create({
    card: {
      padding: 10,
      marginVertical: 5,
      borderColor: "#DDD",
      borderWidth: 2,
      borderRadius: 10,
    },
    cardTitle: {
      fontWeight: "600",
      color: "#203239",
      fontSize: 16,
      marginBottom: 5,
    },
    buttons: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{noteItem.title}</Text>
      <Text>{noteItem.desc}</Text>
      <View style={styles.buttons}>
        <CustomButton
          backgroundColor="orange"
          color="#151D3B"
          text="Edit"
          fontSize={12}
          width={100}
          onPress={() => {
            setSelectedNote(noteItem);
            setCurrentPage("edit");
          }}
        />
        <CustomButton
          backgroundColor="red"
          color="#fff"
          text="Delete"
          fontSize={12}
          width={100}
          onPress={() => {
            deleteNote(noteItem.id);
          }}
        />
      </View>
    </View>
  );
};

const Home = ({ noteList, setCurrentPage, setSelectedNote, deleteNote }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 30,
    },
    emptyNote: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    pageTitle: {
      margin: 20,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      color: "#203239",
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Akbar NoteApp</Text>
        <CustomButton
          backgroundColor="blue"
          color="#203239"
          text="Add Note"
          width="100%"
          onPress={() => {
            setCurrentPage("add");
          }}
        />
        {noteList.length > 0 && (
          <FlatList
            style={{ marginTop: 5 }}
            showsVerticalScrollIndicator={false}
            data={noteList}
            renderItem={({ item }) => (
              <NoteCard
                noteItem={item}
                setCurrentPage={setCurrentPage}
                setSelectedNote={setSelectedNote}
                deleteNote={deleteNote}
              />
            )}
            keyExtractor={(noteItem) => noteItem.id}
          />
        )}
      </View>
      {!(noteList.length > 0) && (
        <View style={styles.emptyNote}>
          <Text>Note Empty</Text>
        </View>
      )}
    </>
  );
};

const AddNote = ({ setCurrentPage, addNote }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 20,
    },
    pageTitle: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      color: "#203239",
    },
    spacerTop: {
      marginTop: 30,
    },
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Add Note</Text>
      <CustomTextInput
        text={title}
        onChange={setTitle}
        label="Title"
        placeholder="Title"
        numberOfLines={1}
        multiline={false}
      />
      <CustomTextInput
        text={desc}
        onChange={setDesc}
        label="Description"
        placeholder="Description"
        multiline
        numberOfLines={4}
      />
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="blue"
          color="#fff"
          text="Submit"
          width="100%"
          onPress={() => {
            addNote(title, desc);
            setCurrentPage("home");
          }}
        />
      </View>
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="green"
          color="#203239"
          text="Home"
          width="100%"
          onPress={() => {
            setCurrentPage("home");
          }}
        />
      </View>
    </View>
  );
};

const EditNote = ({ setCurrentPage, selectedNote, editNote }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 20,
    },
    pageTitle: {
      marginTop: 20,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      color: "#203239",
    },
    spacerTop: {
      marginTop: 30,
    },
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setTitle(selectedNote.title);
    setDesc(selectedNote.desc);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Edit Note</Text>
      <CustomTextInput
        text={title}
        onChange={setTitle}
        label="Title"
        placeholder="Title"
        numberOfLines={1}
        multiline={false}
      />
      <CustomTextInput
        text={desc}
        onChange={setDesc}
        label="Description"
        placeholder="Description"
        multiline
        numberOfLines={4}
      />
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="blue"
          color="#fff"
          text="Submit"
          width="100%"
          onPress={() => {
            editNote(selectedNote.id, title, desc);
            setCurrentPage("home");
          }}
        />
      </View>
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="green"
          color="#fff"
          text="Home"
          width="100%"
          onPress={() => {
            setCurrentPage("home");
          }}
        />
      </View>
    </View>
  );
};

const CustomTextInput = ({
  text,
  onChange,
  label,
  multiline,
  numberOfLines,
}) => {
  const styles = StyleSheet.create({
    textInputWrapper: {
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderRadius: "10px",
      borderColor: "#DDD",
      padding: 10,
      marginTop: 5,
    },
  });

  return (
    <View style={styles.textInputWrapper}>
      <Text>{label}</Text>
      <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={styles.input}
        placeholder={label}
        onChangeText={onChange}
        defaultValue={text}
      />
    </View>
  );
};

const CustomButton = ({
  backgroundColor,
  color,
  text,
  onPress,
  fontSize = 15,
  width = 80,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor,
      alignItems: "center",
      width,
      padding: 10,
      borderRadius: "10px",
      border: "none",
      color,
    },
    buttonText: {
      fontSize,
      fontWeight: "700",
      color: "white",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  setSelectedNote,
  selectedNote,
  addNote,
  editNote,
  deleteNote,
}) => {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          setSelectedNote={setSelectedNote}
          deleteNote={deleteNote}
        />
      );
    case "add":
      return <AddNote addNote={addNote} setCurrentPage={setCurrentPage} />;
    case "edit":
      return (
        <EditNote
          setCurrentPage={setCurrentPage}
          selectedNote={selectedNote}
          editNote={editNote}
        />
      );
    default:
      return <Home setCurrentPage={setCurrentPage} />;
  }
};

const App = () => {
  const initialNoteList = [
    {
      id: 1,
      title: "Note 1",
      desc: "Selamat datang di Note App!",
    },
  ];

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedNote, setSelectedNote] = useState();
  const [noteList, setNoteList] = useState([]);

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;

    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ]);
  };

  const editNote = (noteId, title, desc) => {
    const newNoteList = noteList.map((noteItem) => {
      if (noteItem.id === noteId) {
        noteItem.title = title;
        noteItem.desc = desc;
      }

      return noteItem;
    });

    setNoteList(newNoteList);
  };

  const deleteNote = (noteId) => {
    const newNoteList = noteList.filter((noteItem) => {
      return noteItem.id !== noteId;
    });

    setNoteList(newNoteList);
  };

  return (
    <>
      <StatusBar />
      <CurrentPageWidget
        currentPage={currentPage}
        noteList={noteList}
        setCurrentPage={setCurrentPage}
        setSelectedNote={setSelectedNote}
        selectedNote={selectedNote}
        addNote={addNote}
        editNote={editNote}
        deleteNote={deleteNote}
      />
    </>
  );
};

export default App;
