import { View, Text, StatusBar } from 'react-native';
import { Redirect, Slot, Stack } from 'expo-router';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import getTheme from '../../utils/GetTheme';
export default function AppLayout() {
    const onboarding: any = useSelector((state: any) => state.onboarding);
    const signedIn: boolean  = useSelector((state: any) => state.user.signedIn);

    const theme = getTheme();
    // if (onboarding.isOnboarding) {
    //      return <Redirect href={`/onboarding/page${onboarding.page}`} />;
    // }
    // if (!signedIn) {
    //     return <Redirect href="/sign-in" />;
    // }
    const playgroundMode = false;
    if (playgroundMode) {
      return <Redirect href="/playground-mode" />;
    }

    const screenOptions = {
        fullScreenGestureEnabled: true,
        header: ({navigation, route}: any) => <Header navigation={navigation} route={route} />,
    }
    return (
      <>
        <StatusBar barStyle={theme.name == "light" ? "light-content" : "dark-content"} backgroundColor={theme.background} />
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" />
        </Stack>
      </>
      );
}   
