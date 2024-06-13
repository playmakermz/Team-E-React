import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    ScrollView,
    Text,
    Button,
    TextInput,
} from 'react-native';
import { styles } from './style';

function App() {
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formInput, setFormInput] = useState([
        { title: 'Try', description: 'Description Try', id: crypto.randomUUID() },
    ]);
    const [itemId, setItemId] = useState(null);
    const [buttonUpdate, setButtonUpdate] = useState(true);

    const handleSubmit = (choice) => {
        if (!formTitle) {
            alert('Please insert a title');
            return;
        }

        if (choice === 0) {
            const newItem = {
                title: formTitle,
                description: formDescription,
                id: crypto.randomUUID(),
            };
            setFormInput((prevInput) => [...prevInput, newItem]);
            setFormTitle('');
            setFormDescription('');
        } else if (choice === 1) {
            handleUpdate(itemId);
        }
    };

    const handleDelete = (id) => {
        setFormInput((prevInput) => prevInput.filter((item) => item.id !== id));
    };

    const handleUpdate = (id) => {
        setFormInput((prevInput) =>
            prevInput.map((item) =>
                item.id === id
                    ? { ...item, title: formTitle, description: formDescription }
                    : item
            )
        );
        setFormTitle('');
        setFormDescription('');
        setButtonUpdate(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerSibling}>
                <Text style={styles.h1}>Note Taking App Yusuf</Text>

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

                <TouchableOpacity
                    onPress={() => handleSubmit(buttonUpdate ? 0 : 1)}
                    style={buttonUpdate ? styles.buttonSubmit : styles.buttonUpdate}
                >
                    <Text style={styles.buttonText}>
                        {buttonUpdate ? 'Submit' : 'Update'}
                    </Text>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={styles.itemList}>
                    {formInput.map((item) => (
                        <View key={item.id} style={styles.item}>
                            <Text style={styles.itemTitle}>Title: {item.title}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <View style={styles.itemButtons}>
                                <Button
                                    title="Delete"
                                    color="#FF6347"
                                    onPress={() => handleDelete(item.id)}
                                />
                                <Button
                                    title="Edit"
                                    color="#FFA500"
                                    onPress={() => {
                                        setItemId(item.id);
                                        setFormTitle(item.title);
                                        setFormDescription(item.description);
                                        setButtonUpdate(false);
                                    }}
                                />
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default App;
