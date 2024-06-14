import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: "#4a90e2",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#4a90e2",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white",
  },
  noteContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  noteContainerH2: {
    fontSize: 28,
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  button: {
    margin: 10,
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#007bff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  noteInput: {
    padding: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  noteList: {
    marginTop: 20,
  },
  noteItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noteTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  noteText: {
    fontSize: 16,
    color: "#333",
  },
  noteChecked: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
  },
  clearSearchButton: {
    padding: 12,
    backgroundColor: "#dc3545",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  clearSearchText: {
    color: "white",
    fontSize: 16,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  editButton: {
    backgroundColor: "#28a745",
  },
  iconButton: {
    marginRight: 10,
  },
});

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Note App</Text>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 Note App</Text>
  </View>
);

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [checked, setChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);

  const handleCheckboxChange = () => setChecked(!checked);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    onUpdate(note.id, editedTitle, editedDescription);
    handleEditToggle();
  };

  const noteStyle = checked
    ? { ...styles.noteText, ...styles.noteChecked }
    : styles.noteText;

  return (
    <View style={styles.noteItem}>
      <TouchableOpacity
        onPress={handleCheckboxChange}
        style={styles.iconButton}
      >
        <Icon name={checked ? "check-square" : "square-o"} size={20} />
      </TouchableOpacity>
      {isEditing ? (
        <View style={styles.noteTextContainer}>
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            style={styles.noteInput}
            placeholder="Edit title"
          />
          <TextInput
            value={editedDescription}
            onChangeText={setEditedDescription}
            style={styles.noteInput}
            placeholder="Edit description"
          />
        </View>
      ) : (
        <View style={styles.noteTextContainer}>
          <Text style={noteStyle}>{note.title}</Text>
          <Text style={noteStyle}>{note.description}</Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.actionButton, styles.editButton]}
        onPress={isEditing ? handleSave : handleEditToggle}
      >
        <Icon name={isEditing ? "save" : "edit"} size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDelete(note.id)}
      >
        <Icon name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [noteId, setNoteId] = useState(0);

  const addNote = () => {
    if (currentTitle.trim() !== "" && currentDescription.trim() !== "") {
      setNotes([
        ...notes,
        { id: noteId, title: currentTitle, description: currentDescription },
      ]);
      setCurrentTitle("");
      setCurrentDescription("");
      setErrorMessage("");
      setNoteId(noteId + 1);
    } else {
      setErrorMessage("Title and description cannot be empty");
    }
  };

  const clearNotes = () => setNotes([]);

  const deleteNote = (id) => setNotes(notes.filter((note) => note.id !== id));

  const updateNote = (id, updatedTitle, updatedDescription) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title: updatedTitle, description: updatedDescription }
          : note
      )
    );
  };

  const clearSearch = () => setSearchQuery("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasSearchResults = filteredNotes.length > 0;

  return (
    <KeyboardAvoidingView style={styles.appContainer} behavior="padding">
      <Header />
      <ScrollView>
        <View style={styles.noteContainer}>
          <Text style={styles.noteContainerH2}>Notes</Text>
          <TextInput
            value={currentTitle}
            onChangeText={setCurrentTitle}
            style={styles.noteInput}
            placeholder="Enter title here..."
          />
          <TextInput
            value={currentDescription}
            onChangeText={setCurrentDescription}
            style={styles.noteInput}
            placeholder="Enter description here..."
          />
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={addNote}>
            <Icon name="plus" size={20} color="white" />
            <Text style={styles.buttonText}>Add Note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearNotes}>
            <Icon name="trash" size={20} color="white" />
            <Text style={styles.buttonText}>Clear Notes</Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholder="Search notes..."
            />
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={clearSearch}
            >
              <Text style={styles.clearSearchText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {hasSearchResults ? (
            <View style={styles.noteList}>
              {filteredNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={deleteNote}
                  onUpdate={updateNote}
                />
              ))}
            </View>
          ) : (
            <Text style={{ textAlign: "center", color: "#999" }}>
              No notes found.
            </Text>
          )}
        </View>
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
};

export default NoteApp;
