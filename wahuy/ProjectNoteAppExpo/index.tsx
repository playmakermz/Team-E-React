import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, Modal } from "react-native";

interface Note {
  id: number;
  title: string;
  desc: string;
}

interface CustomButtonProps {
  backgroundColor: string;
  color: string;
  text: string;
  onPress: () => void;
  fontSize?: number;
  width?: number | string;
}

interface CustomTextInputProps {
  text: string;
  onChange: (text: string) => void;
  label: string;
  multiline: boolean;
  numberOfLines: number;
  placeholder: string;
}

interface NoteCardProps {
  item: Note;
  setCurrentPage: (page: string) => void;
  deleteNote: (id: number) => void;
  setCurrentNote: (note: Note) => void;
}

interface HomeProps {
  noteList: Note[];
  setCurrentPage: (page: string) => void;
  deleteNote: (id: number) => void;
  setCurrentNote: (note: Note) => void;
}

interface AddNoteProps {
  setCurrentPage: (page: string) => void;
  addNote: (title: string, desc: string) => void;
}

interface EditNoteProps {
  setCurrentPage: (page: string) => void;
  editNote: (id: number, title: string, desc: string) => void;
  currentNote: Note | null;
}

interface CurrentPageWidgetProps {
  currentPage: string;
  noteList: Note[];
  setCurrentPage: (page: string) => void;
  addNote: (title: string, desc: string) => void;
  editNote: (id: number, title: string, desc: string) => void;
  deleteNote: (id: number) => void;
  setCurrentNote: (note: Note) => void;
  currentNote: Note | null;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  backgroundColor,
  color,
  text,
  onPress,
  fontSize = 16,
  width = 120,
}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor,
      padding: 10,
      borderRadius: 10,
    },
    buttonText: {
      fontSize,
      fontWeight: "700",
      color,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  text,
  onChange,
  label,
  multiline,
  numberOfLines,
  placeholder,
}) => {
  const styles = StyleSheet.create({
    label: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 5,
    },
    textInputWrapper: {
      marginTop: 20,
    },
    input: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  return (
    <View style={styles.textInputWrapper}>
      <Text style={styles.label}>{label}<span style={{ color: "red" }}>*</span></Text>
      <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        defaultValue={text}
      />
    </View>
  );
};

const NoteCard: React.FC<NoteCardProps> = ({ item, setCurrentPage, deleteNote, setCurrentNote }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State to control modal visibility

  const handleDelete = () => {
    deleteNote(item.id);
    setModalVisible(false); // Close modal after delete confirmation
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.desc}</Text>
      <View style={styles.buttons}>
        <CustomButton
          backgroundColor="#FFC300"
          color="#151D3B"
          text="Edit"
          fontSize={12}
          width={100}
          onPress={() => {
            setCurrentNote(item);
            setCurrentPage("edit");
          }}
        />
        <CustomButton
          backgroundColor="#D82148"
          color="#fff"
          text="Delete"
          fontSize={12}
          width={100}
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Modal for delete confirmation */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Apakah Anda yakin ingin menghapus catatan ini?</Text>
            <View style={styles.modalButtons}>
              <CustomButton
                backgroundColor="#D82148"
                color="#fff"
                text="Hapus"
                onPress={handleDelete}
              />
              <CustomButton
                backgroundColor="#247881"
                color="#fff"
                text="Batal"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Home: React.FC<HomeProps> = ({ noteList, setCurrentPage, deleteNote, setCurrentNote }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => setCurrentPage("add")}
    >
      <Text style={styles.addButtonText}>Tambahkan Note</Text>
    </TouchableOpacity>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={noteList}
      renderItem={({ item }) => (
        <NoteCard
          item={item}
          setCurrentPage={setCurrentPage}
          deleteNote={deleteNote}
          setCurrentNote={setCurrentNote}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
);

const AddNote: React.FC<AddNoteProps> = ({ setCurrentPage, addNote }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State to control modal visibility

  const handleAddNote = () => {
    if (!title.trim() || !desc.trim()) {
      setModalVisible(true); // Show modal if fields are empty
      return;
    }

    addNote(title, desc);
    setCurrentPage("home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Tambahkan Note</Text>
      <CustomTextInput
        text={title}
        onChange={setTitle}
        label="Judul"
        placeholder="Judul"
        numberOfLines={1}
        multiline={false}
      />
      <CustomTextInput
        text={desc}
        onChange={setDesc}
        label="Deskripsi"
        placeholder="Deskripsi"
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="#247881"
          color="#fff"
          text="Simpan"
          width="100%"
          onPress={handleAddNote}
        />
      </View>
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="#DDDDDD"
          color="#203239"
          text="Kembali ke Home"
          width="100%"
          onPress={() => setCurrentPage("home")}
        />
      </View>

      {/* Modal for empty fields */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Judul dan Deskripsi tidak boleh kosong.</Text>
            <View style={styles.modalButtons}>
              <CustomButton
                backgroundColor="#247881"
                color="#fff"
                text="OK"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const EditNote: React.FC<EditNoteProps> = ({ setCurrentPage, editNote, currentNote }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDesc(currentNote.desc);
    }
  }, [currentNote]);

  const handleEditNote = () => {
    if (!title.trim() || !desc.trim()) {
      alert("Judul dan Deskripsi tidak boleh kosong.");
      return;
    }

    editNote(currentNote!.id, title, desc);
    setCurrentPage("home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Edit Note</Text>
      <CustomTextInput
        text={title}
        onChange={setTitle}
        label="Judul"
        placeholder="Judul"
        numberOfLines={1}
        multiline={false}
      />
      <CustomTextInput
        text={desc}
        onChange={setDesc}
        label="Deskripsi"
        placeholder="Deskripsi"
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="#247881"
          color="#fff"
          text="Simpan"
          width="100%"
          onPress={handleEditNote}
        />
      </View>
      <View style={styles.spacerTop}>
        <CustomButton
          backgroundColor="#DDDDDD"
          color="#203239"
          text="Kembali ke Home"
          width="100%"
          onPress={() => setCurrentPage("home")}
        />
      </View>
    </View>
  );
};

const CurrentPageWidget: React.FC<CurrentPageWidgetProps> = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  editNote,
  deleteNote,
  setCurrentNote,
  currentNote,
}) => {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          deleteNote={deleteNote}
          setCurrentNote={setCurrentNote}
        />
      );
    case "add":
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case "edit":
      return <EditNote setCurrentPage={setCurrentPage} editNote={editNote} currentNote={currentNote} />;
      default:
        return null;
    }
  };
  
  const App: React.FC = () => {
    const [noteList, setNoteList] = useState<Note[]>([]);
    const [currentPage, setCurrentPage] = useState<string>("home");
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [nextId, setNextId] = useState<number>(1);
  
    // Dummy initial data
    useEffect(() => {
      setNoteList([
        { id: nextId, title: "Catatan Pertama", desc: "Ini adalah catatan pertama." },
        { id: nextId + 1, title: "Catatan Kedua", desc: "Ini adalah catatan kedua." },
      ]);
      setNextId(nextId + 2);
    }, []);
  
    const addNote = (title: string, desc: string) => {
      const newNote: Note = { id: nextId, title, desc };
      setNoteList([...noteList, newNote]);
      setNextId(nextId + 1);
    };
  
    const editNote = (id: number, title: string, desc: string) => {
      const updatedNotes = noteList.map((note) =>
        note.id === id ? { ...note, title, desc } : note
      );
      setNoteList(updatedNotes);
    };
  
    const deleteNote = (id: number) => {
      const updatedNotes = noteList.filter((note) => note.id !== id);
      setNoteList(updatedNotes);
    };
  
    return (
      <View style={styles.container}>
        <CurrentPageWidget
          currentPage={currentPage}
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          addNote={addNote}
          editNote={editNote}
          deleteNote={deleteNote}
          setCurrentNote={setCurrentNote}
          currentNote={currentNote}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    addButton: {
      backgroundColor: "#247881",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    addButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
      textAlign: "center",
    },
    container: {
      flex: 1,
      backgroundColor: "#F0F0F0",
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    card: {
      backgroundColor: "#FFF",
      padding: 20,
      marginBottom: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 10,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "#FFF",
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 20,
    },
    spacerTop: {
      marginTop: 20,
    },
  });
  
  export default App;
  
