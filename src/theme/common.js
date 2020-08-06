import { Dimensions, Platform, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    heading: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 18,
        color: '#3b5998',
        marginVertical: 10,
    },
    title: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 20,
    },
    subtitle: {
        fontFamily: 'Gilroy-Light',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 3 : 0,
    },
    backButton: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Gilroy-ExtraBold',
    },
    icon: {
        marginRight: 5,
        marginTop: Platform.OS === 'ios' ? 0 : 2,
        height: 15,
        width: 15,
    },
});
