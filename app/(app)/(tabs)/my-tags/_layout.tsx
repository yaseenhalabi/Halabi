import { Stack } from 'expo-router';

export default function MyTags() {
  const stackOptions = {
    headerShown: false,
    fullScreenGestureEnabled: true,
  }

  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="index"/>
    </Stack>
  );
}
