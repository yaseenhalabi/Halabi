import { Stack } from 'expo-router';

export default function MyTags() {
  const screenOptions = {
    headerShown: false,
    fullScreenGestureEnabled: true,
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="tag" />
    </Stack>
  );
}
