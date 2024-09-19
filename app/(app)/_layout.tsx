import { View, Text } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { useSelector } from 'react-redux';
export default function AppLayout() {
    const onboarding: boolean = useSelector((state: any) => state.onboarding);
    const signedIn: boolean  = useSelector((state: any) => state.user.signedIn ? true : false);
    if (onboarding) {
        return <Redirect href="/onboarding" />;
    }
    if (!signedIn) {
        return <Redirect href="/sign-in" />;
    }
    return (
        <Slot />
    );
}