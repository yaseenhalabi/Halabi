import { View, Text, StatusBar } from "react-native";
import { Redirect, Slot, Stack } from "expo-router";
import Header from "../../components/Header";
import getTheme from "../../utils/GetTheme";
import { StyleSheet } from "react-native";
import CommonText from "../../components/CommonText";
import Tutorial from "../../components/tutorial/Tutorial";
import { useSelector } from "react-redux";
export default function AppLayout() {
  const theme = getTheme();

  const screenOptions = {
    fullScreenGestureEnabled: true,
    header: () => <Header />,
  };

  const tutorialMode = !useSelector(
    (state: any) => state.user.isTutorialComplete
  );
  if (tutorialMode) {
    return (
      <>
        {/* TUTORIAL COMPONENT */}
        <Tutorial />
        <StatusBar
          barStyle={theme.name == "light" ? "dark-content" : "light-content"}
          backgroundColor={theme.background}
        />
        <Stack>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" options={{ presentation: "modal" }} />
        </Stack>
      </>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={theme.name == "light" ? "dark-content" : "light-content"}
        backgroundColor={theme.background}
      />
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="settings"
          options={{ presentation: "modal", header: () => null }}
        />
      </Stack>
    </>
  );
}
