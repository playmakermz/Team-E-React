import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
} from "react-native";
import { useState } from "react";
import { styles } from "./style";

function App() {
  let [formTitle, setFormTitle] = useState("");
  let [formDescription, setFormDescription] = useState("");
  let [formInput, setFormInput] = useState([
    { title: "Try", description: "Description Try", id: crypto.randomUUID() },
  ]);
  let [itemid, setItemId] = useState(null);
  let [buttonUpdate, setButtonUpdate] = useState(true);

  function handleSubmit(choice) {
    if (formTitle === "") {
      alert("Please insert a title");
      return "";
    }

    if (choice === 0) {
      let abc = {
        title: formTitle,
        description: formDescription,
        id: crypto.randomUUID(),
      };
      setFormInput([...formInput, abc]);
      setFormTitle("");
      setFormDescription("");
    } else if (choice === 1) {
      handleUpdate(itemid);
    }
  }

  function handleDelete(input) {
    let abc = formInput.filter((item) => {
      return item.id !== input;
    });
    setFormInput(abc);
  }

  function handleUpdate(inputid) {
    let abc = formInput.map((item) => {
      if (item.id === inputid) {
        return { ...item, title: formTitle, description: formDescription };
      } else {
        return item;
      }
    });

    setFormInput(abc);
    setFormTitle("");
    setFormDescription("");
    setButtonUpdate(true);
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
          <TouchableOpacity
            onPress={() => handleSubmit(0)}
            style={styles.buttons}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleSubmit(1)}
            style={styles.buttonu}
          >
            <Text style={styles.buttonTextUpdate}>Update</Text>
          </TouchableOpacity>
        )}

        <ScrollView contentContainerStyle={styles.itemList}>
          {formInput.map((item) => (
            <View key={item.id} style={styles.itemm}>
              <Text>Title: {item.title}</Text>
              <Text>{item.description}</Text>
              <Button
                title="Delete Note"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
              <Button
                title="Update Note"
                color="orange"
                onPress={() => {
                  setItemId(item.id);
                  setButtonUpdate(false);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default App;
