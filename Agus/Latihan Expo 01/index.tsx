import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native"
import React, { useState } from "react"

export default function App() {
  const [input, setInput] = useState<string>("")
  const [result, setResult] = useState<string>("")

  const handlePress = (value: string) => {
    if (value === "=") {
      calculateResult()
    } else if (value === "C") {
      clearInput()
    } else {
      setInput((prevInput) => prevInput + value)
    }
  }

  const calculateResult = () => {
    try {
      const evaluatedResult = eval(input)
      setResult(evaluatedResult.toString())
    } catch (error) {
      setResult("Error")
    }
  }

  const clearInput = () => {
    setInput("")
    setResult("")
  }

  const handleBySugaPress = () => {
    Linking.openURL("https://github.com/MuhammadAgusLuthfi")
  }

  const renderButton = (value: string, buttonColor: string = "#e0e0e0") => (
    <TouchableOpacity
      key={value}
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {renderButton("7")}
        {renderButton("8")}
        {renderButton("9")}
        {renderButton("/", "#ff9800")}
        {renderButton("4")}
        {renderButton("5")}
        {renderButton("6")}
        {renderButton("*", "#ff9800")}
        {renderButton("1")}
        {renderButton("2")}
        {renderButton("3")}
        {renderButton("-", "#ff9800")}
        {renderButton("0")}
        {renderButton(".")}
        {renderButton("=", "#4caf50")}
        {renderButton("+", "#ff9800")}
        {renderButton("C", "#f44336")}
        {renderButton("(", "#2196f3")}
        {renderButton(")", "#2196f3")}
        <TouchableOpacity
          key="By Suga"
          style={[styles.button, { backgroundColor: "#2196f3" }]}
          onPress={handleBySugaPress}
        >
          <Text style={styles.buttonText}>By Suga</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  inputText: {
    fontSize: 40,
    color: "#000",
  },
  resultText: {
    fontSize: 30,
    color: "#888",
  },
  buttonContainer: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: "25%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  buttonText: {
    fontSize: 30,
    color: "#000",
  },
})
