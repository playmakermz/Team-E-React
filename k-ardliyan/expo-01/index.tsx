import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Linking,
} from 'react-native';
import styles from './style';

const buttons = [
    ['C', 'DEL', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
];

const App = () => {
    const [currentNumber, setCurrentNumber] = useState('');
    const [lastNumber, setLastNumber] = useState('');
    const [isResult, setIsResult] = useState(false);

    const handleInput = (buttonPressed: string) => {
        if (buttonPressed === 'C') {
            setCurrentNumber('');
            setLastNumber('');
            setIsResult(false);
            return;
        }

        if (buttonPressed === 'DEL') {
            setCurrentNumber(currentNumber.slice(0, -1));
            return;
        }

        if (buttonPressed === '=') {
            if (currentNumber === '' || /[+\-*/]$/.test(currentNumber)) {
                return;
            }
            calculate();
            setIsResult(true);
            return;
        }

        if (isResult) {
            if (/[+\-*/]/.test(buttonPressed)) {
                setCurrentNumber(currentNumber + buttonPressed);
            } else {
                setCurrentNumber(buttonPressed);
            }
            setIsResult(false);
        } else {
            setCurrentNumber(currentNumber + buttonPressed);
        }
    };

    const calculate = () => {
        try {
            const result = eval(currentNumber);
            setCurrentNumber(result.toString());
            setLastNumber(
                (prevLastNumber) => `${prevLastNumber} ${currentNumber} =`
            );
        } catch (error) {
            setCurrentNumber('Error');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.resultContainer}>
                <Text style={[styles.resultText, styles.lastNumber]}>
                    {lastNumber}
                </Text>
                <Text
                    style={[styles.resultText, isResult && styles.resultOutput]}
                >
                    {currentNumber}
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                {buttons.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((button, buttonIndex) => (
                            <TouchableOpacity
                                key={buttonIndex}
                                style={[
                                    styles.button,
                                    button === '=' ? styles.equalsButton : null,
                                ]}
                                onPress={() => handleInput(button)}
                            >
                                <Text style={styles.buttonText}>{button}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.footer}>
                <Text
                    style={styles.footerText}
                    onPress={() =>
                        Linking.openURL('https://github.com/k-ardliyan')
                    }
                >
                    by @k-ardliyan
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default App;
