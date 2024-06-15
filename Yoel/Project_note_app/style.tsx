import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    input: {
        width: '100%',
        maxWidth: 500,
        border: '1px solid grey',
        borderRadius: 3,
        opacity: '0.6',
        padding: 5,
        margin: 3,
    },

    container: {
        height: 600,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#D8EFD3'
    },

    containerSibling: {
        width: '100%',
        maxWidth: 500,
        padding: 10,
        backgroundColor: '#95D2B3',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        alignItems: 'center',
        elevation: 18,
    },

    item: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    h1: {
        marginBottom: 20,
        padding: 2,
        borderRadius: 3,
        backgroundColor: '#55AD9B',
        color: 'white',
        fontWeight: 'bold',
    },

    itemList: {
        display: 'flex',
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 5,
        width: '100%',
        gap: 10,
        flexWrap: 'wrap',
    },

    itemm: {
        //flex: '25%',
        border: '1px solid grey',
        width: 480,
        borderRadius: 3,

    },

    itemd: {
        margin: 5,
        opacity: '0.8',
    },

    itemu: {
        margin: 5,
        opacity: '0.8',
    },

    buttons: {
        backgroundColor: '#F1F8E8',
        marginTop: 10,
        opacity: '0.7',
        width: 100,
        height: 20,
        borderRadius: 3,
        alignItems: 'center',
        color: 'white',
    },

    buttonu: {
        backgroundColor: '#55AD9B',
        marginTop: 10,
        opacity: '0.7',
        width: 100,
        height: 20,
        borderRadius: 3,
        alignItems: 'center',
        color: 'white',
    },

});

export { styles }