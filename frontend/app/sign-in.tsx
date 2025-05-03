import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import getTheme from '../utils/GetTheme';
import CommonText from '../components/CommonText';
import googleIcon from '../assets/images/google-icon.png';

export default function SignIn() {
    const dispatch = useDispatch();
    const signIn = () => {
        dispatch(setUser({ signedIn: true, name: 'John Doe' }));
        router.navigate('/');
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text onPress={() => signIn()} style={styles.title}>
                Sign Up
            </Text>
            <LineWordLine word='with'/>
            <AuthButton text='Google' icon={googleIcon} onPress={() => signIn()} />
            <LineWordLine word='or'/>
            <AuthButton text='Continue Without an Account*' onPress={() => signIn()} />
            <CommonText size='medium' weight='regular' color='semi'>*Warning: you’re data will not be backed up in the cloud (you can always change this later in settings)</CommonText>
        </SafeAreaView>
    );
}

type LineWordLineProps = {
    word: string;
}
function LineWordLine({ word } : LineWordLineProps) {
    const theme = getTheme();
    
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{...styles.line, backgroundColor: theme.text.semi}} />
            <Text style={{ color: theme.text.semi }}>  {word}  </Text>
            <View style={{...styles.line, backgroundColor: theme.text.semi}} />
        </View>
    );
}

type AuthButtonProps = {
    text: string;
    icon?: any;
    onPress: () => void;
}

function AuthButton({ text, icon, onPress }: AuthButtonProps) {
    const theme = getTheme();
    return (
        <TouchableOpacity onPress={onPress} style={{width: '100%'}}>
            <View style={{...styles.authButton, backgroundColor: theme.button}}>
                {icon && <Image source={icon} style={styles.authButtonIcon}/>}
                <CommonText size='medium' weight='regular' color='full'>{text}</CommonText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        padding: 20,
        gap: 15,
        backgroundColor: 'black',
    },

    title: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
    },

    line: {
        flex: 1,
        height: 1,
        alignSelf: 'center',
    },

    authButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
        gap: 7,
        height: 50,
    },

    authButtonIcon: {
        width: 25,
        height: 25,
    }
});
