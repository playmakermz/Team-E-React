import React, { useState } from 'react';
import { TouchableOpacity, View, ScrollView, Text, TextInput } from 'react-native';
import { styles } from './style';

function App() {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formInput, setFormInput] = useState([{ title: 'Title', description: 'Description', id: crypto.randomUUID() }]);
  const [itemId, setItemId] = useState(null);
  const [buttonUpdate, setButtonUpdate] = useState(true);

  function handleSubmit(choice) {
    if (formTitle === '') { 
      alert('Please insert a title'); 
      return; 
    }

    if (choice === 0) {
      const newItem = { title: formTitle, description: formDescription, id: crypto.randomUUID() };
      setFormInput([...formInput, newItem]);
      setFormTitle('');
      setFormDescription('');
    } else if (choice === 1) {
      handleUpdate(itemId);
    }
  }

  function handleDelete(inputId) {
    const updatedList = formInput.filter(item => item.id !== inputId);
    setFormInput(updatedList);
  }

  function handleUpdate(inputId) {
    const updatedList = formInput.map(item => {
      if (item.id === inputId) {
        return { ...item, title: formTitle, description: formDescription };
      }
      return item;
    });

    setFormInput(updatedList);
    setFormTitle('');
    setFormDescription('');
    setButtonUpdate(true);
  }

  function handleEdit(item) {
    setFormTitle(item.title);
    setFormDescription(item.description);
    setItemId(item.id);
    setButtonUpdate(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSibling}>
        <Text style={styles.h1}>Note Taking App</Text>

        <TextInput
          style={styles.input}
          placeholder="Note Title"
          onChangeText={setFormTitle}
          value={formTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Note Description"
          onChangeText={setFormDescription}
          value={formDescription}
        />

        {buttonUpdate ? (
          <TouchableOpacity onPress={() => handleSubmit(0)} style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleSubmit(1)} style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        )}

        <ScrollView contentContainerStyle={styles.itemList}>
          {formInput.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.updateItemButton}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default App;
