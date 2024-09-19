import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
export default function SignIn() {
    const dispatch = useDispatch();
    const signIn = () => {
        dispatch(setUser({ signedIn: true, name: 'John Doe' }));
        router.navigate('/');
    }
    return (
        <View>
            <Text
                style={{
                    color: '#fff',
                }}
                onPress={() => signIn()}
            >
                SignIn
            </Text>
        </View>
    );
}