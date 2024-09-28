import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonText from './CommonText';
import getTheme from '../utils/GetTheme';
import HeaderIcon from './HeaderIcon';
import settingsIcon from '../assets/images/settings-icon-white.png';
import uploadIcon from '../assets/images/upload-icon-white.png';
import profilePicIcon from '../assets/images/profile-pic-icon-white.png';

type HeaderProps = {
    navigation: any;
}
export default function Header({ navigation }: HeaderProps) {
    const theme = getTheme();
    const route = useRoute();
    let currentRouteName = '';
    switch (route.name) {
        case 'index':
            currentRouteName = 'My Contacts';
            break;
        case 'my-tags':
            currentRouteName = 'My Tags';
            break;
    }
    const onPress = () => {
        console.log('pressed');
    }

    return (

        <>
        <SafeAreaView style={{backgroundColor: theme.background}}/>
        <View style={{...styles.container, backgroundColor: theme.background}}>
            <HeaderIcon size={25} source={profilePicIcon} onPress={onPress} />
            <CommonText style={styles.headerText}>{currentRouteName}</CommonText>
            <View style={styles.iconsContainer}>
                <HeaderIcon size={20} source={uploadIcon} onPress={onPress} />
                <HeaderIcon size={20} source={settingsIcon} onPress={onPress} />
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: '2%',
        flexDirection: 'row',
    },
    iconsContainer: {
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        position: 'absolute',
        left: '25%',
        right: '25%',
        bottom: '70%',
        textAlign: 'center',
    }
})