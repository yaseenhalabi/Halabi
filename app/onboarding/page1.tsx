import { View, StyleSheet, Text } from 'react-native';
import CommonText from '../../components/CommonText';

export default function page1() {
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Welcome to Halabi! 👋</Text>
            <View style={{height: '25%'}}/>
            <CommonText style={{color: "white" }} size='large' >This marks your first step towards <CommonText size='large' style={{color: "white" }} weight='bold'>never forgetting a name again!</CommonText></CommonText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    mainText: {
        fontSize: 50,
        fontFamily: 'Poppins-Regular',
        color: 'white',
    },
})


