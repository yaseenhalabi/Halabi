import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
export default function MyContacts() {
  const stackOptions = {
    headerShown: false,
    fullScreenGestureEnabled: true,
  }

  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="contact"/>
    </Stack>
  );
}
