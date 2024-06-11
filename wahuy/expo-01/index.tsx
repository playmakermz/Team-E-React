import { View, Text, Button, TextInput } from "react-native";
import { useState } from "react";
import { styles } from "./style";

function App() {
  const [formInput, setFormInput] = useState("");

  function handleSubmit() {
    try {
      setFormInput(eval(formInput).toString());
    } catch (e) {
      alert("Invalid calculation");
    }
  }

  const createButton = (title: string, onPress: () => void, color?: string) => (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} color={color} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerSibling}>
        <Text style={styles.h1}>React Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Calculation"
          placeholderTextColor="#888"
          onChangeText={setFormInput}
          value={formInput}
        />
        <View style={styles.item}>
          {createButton("Clear", () => setFormInput(""), "#d9534f")}
          {createButton("()", () => setFormInput(`(${formInput})`), "#5bc0de")}
          {createButton("%", () => setFormInput(`${formInput}%`), "#5bc0de")}
          {createButton(":", () => setFormInput(`${formInput}/`), "#5bc0de")}
        </View>
        <View style={styles.item}>
          {createButton("7", () => setFormInput(`${formInput}7`), "#5bc0de")}
          {createButton("8", () => setFormInput(`${formInput}8`), "#5bc0de")}
          {createButton("9", () => setFormInput(`${formInput}9`), "#5bc0de")}
          {createButton("x", () => setFormInput(`${formInput}*`), "#5bc0de")}
        </View>
        <View style={styles.item}>
          {createButton("4", () => setFormInput(`${formInput}4`), "#5bc0de")}
          {createButton("5", () => setFormInput(`${formInput}5`), "#5bc0de")}
          {createButton("6", () => setFormInput(`${formInput}6`), "#5bc0de")}
          {createButton("-", () => setFormInput(`${formInput}-`), "#5bc0de")}
        </View>
        <View style={styles.item}>
          {createButton("1", () => setFormInput(`${formInput}1`), "#5bc0de")}
          {createButton("2", () => setFormInput(`${formInput}2`), "#5bc0de")}
          {createButton("3", () => setFormInput(`${formInput}3`), "#5bc0de")}
          {createButton("+", () => setFormInput(`${formInput}+`), "#5bc0de")}
        </View>
        <View style={styles.item}>
          {createButton("0", () => setFormInput(`${formInput}0`), "#5bc0de")}
          {createButton(".", () => setFormInput(`${formInput}.`), "#5bc0de")}
        </View>
        <View style={styles.submitButtonContainer}>
          {createButton("Submit Calculation", handleSubmit, "#0275d8")}
        </View>
      </View>
    </View>
  );
}

export default App;
