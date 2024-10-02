import { View, Text, StatusBar } from 'react-native';
import { Redirect, Slot, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
export default function AppLayout() {
    const onboarding: any = useSelector((state: any) => state.onboarding);
    const signedIn: boolean  = useSelector((state: any) => state.user.signedIn);

    // if (onboarding.isOnboarding) {
    //     return <Redirect href={`/onboarding/page${onboarding.page}`} />;
    // }
    // if (!signedIn) {
    //     return <Redirect href="/sign-in" />;
    // }

    const screenOptions = {
        fullScreenGestureEnabled: true,
        header: ({navigation, route}: any) => <Header navigation={navigation} route={route} />,
    }
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" />
        </Stack>
      </>
      );
}   