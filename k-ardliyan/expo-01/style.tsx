import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
    },
    resultContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: '#1d1d1d',
    },
    resultText: {
        fontSize: 48,
        color: '#ffffff',
    },
    lastNumber: {
        fontSize: 32,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    resultOutput: {
        fontSize: 64,
        color: '#f09a36',
    },
    buttonsContainer: {
        flex: 5,
        padding: 10,
        backgroundColor: '#121212',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 5,
        backgroundColor: '#333333',
        borderRadius: 10,
    },
    equalsButton: {
        backgroundColor: '#f09a36',
    },
    buttonText: {
        fontSize: 32,
        color: '#ffffff',
    },
    footer: {
        alignItems: 'center',
        padding: 10,
    },
    footerText: {
        color: '#f09a36',
        textDecorationLine: 'underline',
    },
});

export default styles;
