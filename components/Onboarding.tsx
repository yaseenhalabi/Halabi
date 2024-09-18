import { View, StyleSheet } from 'react-native';
import CustomText from './CustomText';
export default function Onboarding() {
    return (
        <View style={styles.container}>
            <CustomText size='large' style='bold' color='semi'>Welcome to the app!</CustomText>
            <CustomText size='medium' style='regular'>This is a sample onboarding screen.</CustomText>
            <CustomText size='small' style='light'>You can use this screen to introduce users to your app.</CustomText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});