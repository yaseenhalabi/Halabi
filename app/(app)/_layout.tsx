import { View, Text, StatusBar } from 'react-native';
import { Redirect, Slot, Stack } from 'expo-router';
import Header from '../../components/Header';
import getTheme from '../../utils/GetTheme';
export default function AppLayout() {
    const theme = getTheme();

    const screenOptions = {
        
        fullScreenGestureEnabled: true,
        header: ({navigation, route}: any) => <Header navigation={navigation} route={route} />,
      }
    return (
      <>
        <StatusBar barStyle={theme.name == "light" ? "dark-content" : "light-content"} backgroundColor={theme.background} />
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
        </Stack>
      </>
      );
}   
