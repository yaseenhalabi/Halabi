import { View, Text, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonText from './CommonText';
import getTheme from '../utils/GetTheme';
import HeaderIcon from './HeaderIcon';
import settingsIcon from '../assets/images/settings-icon-white.png';
import uploadIcon from '../assets/images/upload-icon-white.png';
import profilePicIcon from '../assets/images/profile-pic-icon-white.png';
import backArrowIcon from '../assets/images/back-arrow-icon-white.png';
import { useEffect, useState } from 'react';
type HeaderProps = {
    navigation: any;
    route: any;
}
export default function Header({navigation, route}: HeaderProps) {
    const theme = getTheme();
    const pathname = usePathname();
    const [showBackArrow, setShowBackArrow] = useState(false);
    const [currentRouteName, setCurrentRouteName] = useState('My Contacts');
    useEffect(() => {
        switch (pathname) {
            case '/my-contacts':
                setCurrentRouteName('My Contacts');
                break;
            case '/my-tags':
                setCurrentRouteName('My Tags');
                break;
            case '/settings':
                setCurrentRouteName('Settings');
                break;
            default:
                setCurrentRouteName('My Contacts');
                break;
        }
        setShowBackArrow(pathname == '/my-contacts/profile' || pathname == '/my-tags/tag' || pathname == '/settings');
    }, [route]);
    

    const onPress = () => {
        console.log('pressed');
    }
    const onPressSettings = () => {
        navigation.navigate('settings');
    }
    const onPressBack = () => {
        navigation.goBack();
    }

    return (
        <>
        <SafeAreaView style={{backgroundColor: theme.background}}/>
        <View style={{...styles.container, backgroundColor: theme.background}}>
            <HeaderIcon size={25} source={profilePicIcon} onPress={onPress} />
            <View style={styles.headerTextContainer}>
                <CommonText>{currentRouteName}</CommonText>
            </View>
            <View style={styles.iconsContainer}>
                <HeaderIcon size={20} source={uploadIcon} onPress={onPress} />
                {
                    showBackArrow ? 
                    <HeaderIcon size={20} source={backArrowIcon} onPress={onPressBack} /> :
                    <HeaderIcon size={20} source={settingsIcon} onPress={onPressSettings} />
                }
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
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    iconsContainer: {
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTextContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    }
})