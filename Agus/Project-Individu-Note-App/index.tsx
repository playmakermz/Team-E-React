import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Linking,
} from "react-native"

interface Note {
  id: string
  title: string
  content: string
  checklist: boolean
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  const addNote = () => {
    if (title && content) {
      const newNote: Note = {
        id: Math.random().toString(),
        title,
        content,
        checklist: false,
      }
      setNotes([...notes, newNote])
      setTitle("")
      setContent("")
    }
  }

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
  }

  const toggleChecklist = (id: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, checklist: !note.checklist } : note
    )
    setNotes(updatedNotes)
  }

  const startEditingNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id)
    if (noteToEdit) {
      setTitle(noteToEdit.title)
      setContent(noteToEdit.content)
      setEditingNoteId(id)
    }
  }

  const editNote = () => {
    if (editingNoteId) {
      const updatedNotes = notes.map((note) =>
        note.id === editingNoteId ? { ...note, title, content } : note
      )
      setNotes(updatedNotes)
      setTitle("")
      setContent("")
      setEditingNoteId(null)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Content"
        multiline
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={editingNoteId ? editNote : addNote}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#0056b3" : "#007bff" },
          ]}
        >
          <Text style={styles.buttonText}>
            {editingNoteId ? "Update Note" : "Add Note"}
          </Text>
        </Pressable>
        {editingNoteId && (
          <Pressable
            onPress={() => {
              setTitle("")
              setContent("")
              setEditingNoteId(null)
            }}
            style={({ pressed }) => [
              styles.button,
              styles.cancelButton,
              { backgroundColor: pressed ? "#b30000" : "#FF4C4C" },
            ]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        )}
      </View>
      <ScrollView style={styles.notesContainer}>
        {notes.map((note) => (
          <View key={note.id} style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            <Pressable
              onPress={() => toggleChecklist(note.id)}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: pressed ? "#E1E1E1" : "transparent" },
              ]}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  note.checklist ? styles.checkedText : styles.uncheckedText,
                ]}
              >
                {note.checklist ? "Uncheck" : "Check"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => startEditingNote(note.id)}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => deleteNote(note.id)}
              style={styles.actionButton}
            >
              <Text style={[styles.actionButtonText, styles.deleteText]}>
                Delete
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Mampir ke GitHub</Text>
        <Pressable
          onPress={() =>
            Linking.openURL("https://github.com/MuhammadAgusLuthfi")
          }
        >
          <Text style={[styles.footerText, styles.link]}>GitHub</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  contentInput: {
    height: 100,
    verticalAlign: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#FF4C4C",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  notesContainer: {
    marginTop: 20,
  },
  noteContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
  },
  noteContent: {
    color: "#666666",
  },
  actionButton: {
    marginTop: 5,
  },
  actionButtonText: {
    color: "#007BFF",
  },
  checkedText: {
    color: "#28A745",
  },
  uncheckedText: {
    color: "#DC3545",
  },
  deleteText: {
    color: "#FF4C4C",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#333333",
  },
  link: {
    color: "#007BFF",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
})

export default App
