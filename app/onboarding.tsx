import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { finishOnboarding } from '../redux/onboardingSlice';
export default function Onboarding() {
    const dispatch = useDispatch();
    const finishOnBoarding = () => {
        dispatch(finishOnboarding({}));
        router.navigate('/');
    }

    return (
        <View>
            <Text 
                onPress={() => finishOnBoarding()}
                style={{color: "white"}}>
                Finish Onboarding
            </Text>
        </View>
    );
}

