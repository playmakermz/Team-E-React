import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const initialNotes = [
      { id: '1', title: 'Membersihkan Kamar', description: 'Merapihkan kamar, Mengepel kamar, dan lainnya' },
    ];
    setNotes(initialNotes);
  }, []);

  const addNote = () => {
    if (title && description) {
      if (editingId) {
        const updatedNotes = notes.map(note =>
          note.id === editingId ? { ...note, title, description } : note
        );
        setNotes(updatedNotes);
        setEditingId(null);
      } else {
        const newNote = { id: String(notes.length + 1), title, description };
        setNotes([...notes, newNote]);
      }
      setTitle('');
      setDescription('');
    }
  };

  const deleteNote = id => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
  };

  const editNote = (id, title, description) => {
    setEditingId(id);
    setTitle(title);
    setDescription(description);
  };

  const NoteCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => editNote(item.id, item.title, item.description)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#f44336' }]}
          onPress={() => deleteNote(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOTE APP | Muhammad Farhan</Text>
      <TextInput
        style={styles.input}
        placeholder="Judul"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Deskripsi Catatan"
        multiline
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={addNote}>
        <Text style={styles.submitButtonText}>{editingId ? 'Update' : 'Submit'}</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteCard item={item} />}
        keyExtractor={item => item.id}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NoteApp;
