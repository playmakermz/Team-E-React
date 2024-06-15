import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Alert, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { useState } from 'react';
import { styles } from './style';

function App() {
  let [formInput, setFormInput] = useState('');

  function handleSubmit() {
    try {
      setFormInput(eval(formInput).toString());
    } catch (error) {
      Alert.alert('Invalid calculation');
    }
  }

  function renderButton(title: string, onPress: (event: GestureResponderEvent) => void, style: StyleProp<ViewStyle>) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSibling}>
        <Text style={styles.h1}>Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Calculation"
          onChangeText={setFormInput}
          value={formInput}
        />
        <View style={styles.item}>
          {renderButton('Clear', () => setFormInput(''), styles.buttonClear)}
          {renderButton('()', () => setFormInput(`(${formInput})`), styles.buttonOperator)}
          {renderButton('%', () => setFormInput(`${formInput}%`), styles.buttonOperator)}
          {renderButton(':', () => setFormInput(`${formInput}/`), styles.buttonOperator)}
        </View>
        <View style={styles.item}>
          {renderButton('7', () => setFormInput(`${formInput}7`), styles.buttonNumber)}
          {renderButton('8', () => setFormInput(`${formInput}8`), styles.buttonNumber)}
          {renderButton('9', () => setFormInput(`${formInput}9`), styles.buttonNumber)}
          {renderButton('x', () => setFormInput(`${formInput}*`), styles.buttonOperator)}
        </View>
        <View style={styles.item}>
          {renderButton('4', () => setFormInput(`${formInput}4`), styles.buttonNumber)}
          {renderButton('5', () => setFormInput(`${formInput}5`), styles.buttonNumber)}
          {renderButton('6', () => setFormInput(`${formInput}6`), styles.buttonNumber)}
          {renderButton('-', () => setFormInput(`${formInput}-`), styles.buttonOperator)}
        </View>
        <View style={styles.item}>
          {renderButton('1', () => setFormInput(`${formInput}1`), styles.buttonNumber)}
          {renderButton('2', () => setFormInput(`${formInput}2`), styles.buttonNumber)}
          {renderButton('3', () => setFormInput(`${formInput}3`), styles.buttonNumber)}
          {renderButton('+', () => setFormInput(`${formInput}+`), styles.buttonOperator)}
        </View>
        <View style={styles.item}>
          {renderButton('0', () => setFormInput(`${formInput}0`), styles.buttonNumber)}
          {renderButton('.', () => setFormInput(`${formInput}.`), styles.buttonNumber)}
        </View>
        {renderButton('Submit Calculation', handleSubmit, styles.buttonSubmit)}
      </View>
    </View>
  );
}

export default App;
