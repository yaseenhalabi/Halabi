import { Stack } from "expo-router";

export default function MyContacts() {
  const stackOptions = {
    headerShown: false,
    fullScreenGestureEnabled: true,
  };

  return (
    <Stack screenOptions={stackOptions}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
