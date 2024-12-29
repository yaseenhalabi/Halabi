import { View, Text, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonText from './CommonText';
import getTheme from '../utils/GetTheme';
import HeaderIcon from './HeaderIcon';
import whiteSettingsIcon from '../assets/images/settings-icon-white.png';
import whiteUploadIcon from '../assets/images/upload-icon-white.png';
import whiteProfilePicIcon from '../assets/images/profile-pic-icon-white.png';
import whiteBackArrowIcon from '../assets/images/back-arrow-icon-white.png';
import blackSettingsIcon from '../assets/images/settings-icon-black.png';
import blackUploadIcon from '../assets/images/upload-icon-black.png';
import blackProfilePicIcon from '../assets/images/profile-pic-icon-black.png';
import blackBackArrowIcon from '../assets/images/back-arrow-icon-black.png';
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
            case '/my-contacts/profile':
                setCurrentRouteName('My Contacts');
                break;
            case '/my-tags':
                setCurrentRouteName('My Tags');
                break;
            case '/my-tags/tag':
                setCurrentRouteName('My Tags');
                break;
            case '/settings':
                setCurrentRouteName('Settings');
                break;
            default:
                setCurrentRouteName('Halabi');
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
        <SafeAreaView edges={['top']} />
        <View style={{...styles.container, backgroundColor: theme.background}}>
            <HeaderIcon size={25} source={theme.name === "dark" ? whiteProfilePicIcon : blackProfilePicIcon} onPress={onPress}/>
            <View style={styles.headerTextContainer}>
                <CommonText>{currentRouteName}</CommonText>
            </View>
            <View style={styles.iconsContainer}>
                <HeaderIcon size={20} source={theme.name === "dark" ? whiteUploadIcon : blackUploadIcon} onPress={onPress} />
                {
                    showBackArrow ? 
                    <HeaderIcon size={20} source={theme.name === "dark" ? whiteBackArrowIcon : blackBackArrowIcon} onPress={onPressBack} /> :
                    <HeaderIcon size={20} source={theme.name === "dark" ? whiteSettingsIcon : blackSettingsIcon} onPress={onPressSettings} />
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
        paddingVertical: 15,
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