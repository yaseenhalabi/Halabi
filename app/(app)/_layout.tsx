import { View, Text, StatusBar } from 'react-native';
import { Redirect, Slot, Stack } from 'expo-router';
import { useSelector } from 'react-redux';
export default function AppLayout() {
    const onboarding: any = useSelector((state: any) => state.onboarding);
    const signedIn: boolean  = useSelector((state: any) => state.user.signedIn);

    // if (onboarding.isOnboarding) {
    //     return <Redirect href={`/onboarding/page${onboarding.page}`} />;
    // }
    // if (!signedIn) {
    //     return <Redirect href="/sign-in" />;
    // }

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </>
      );
}   