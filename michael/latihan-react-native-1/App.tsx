import { Button, StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import { useState } from 'react'
import {styles} from './style'


function App(){
  let [formInput, setFormInput] =  useState('')
  let [isSyntaxError, setIsSyntaxError] = useState(false)

  const handleSubmit = () => {
    try {
      const result = eval(formInput);
      setFormInput(result);
    } catch (err) {
      console.log('eval error: ', err)
      setFormInput('')
      setIsSyntaxError(true);
    }
  }

  // untuk setIsSyntaxError = false setiap pengguna pencet tombol
  const handlePressButton = (input) => {
    setIsSyntaxError(false);

    setFormInput(input);
  }
  
  return (
    <View style={styles.container}>
      {/* Bagian Judul */}
      <View style={styles.judulWrapper}>
        <Text style={styles.judul}>React Calculator</Text>
      </View>
      {/* Bagian text hasil perhitungan */}
      <View style={styles.inputWrapper}>
        <Text style={styles.input}>{formInput ? formInput : (isSyntaxError ? 'Syntax Error!' : 'Calculator')}</Text>
      </View>
      {/* bagian tombol kalkulator */}
      <View style={styles.containerTombol}>
        <View style={styles.item}>
          <TouchableOpacity style={styles.buttonClear} onPress={() => {handlePressButton('')}}>
            <Text style={styles.textClear}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`(${formInput})`)}}>
            <Text style={styles.buttonText}>()</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}%`)}}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}/`)}}>
            <Text style={styles.buttonText}>:</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.item}>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}7`)}}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}8`)}}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}9`)}}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}*`)}}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}4`)}}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}5`)}}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}6`)}}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}-`)}}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}1`)}}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}2`)}}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}3`)}}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}+`)}}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.item}>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}0`)}}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {handlePressButton(`${formInput}.`)}}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
        </View>

        <Button
          color="#f194ff"
          title="Submit Calculation"
          onPress={() => {handleSubmit()}}
        ></Button>
      </View>
    </View>
  )

}

export default App