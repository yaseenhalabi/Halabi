import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import FontLoader from "../utils/FontLoader";
import ProviderAndPersistor from "../components/ProviderAndPersistor";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/themeSlice";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTest } from "../api/test";
import Welcome from "./welcome";
import Tutorial from "./tutorial";
export default function Root() {
  const loaded = FontLoader();
  if (!loaded) return null;
  return (
    <ProviderAndPersistor>
      <App />
    </ProviderAndPersistor>
  );
}

function App() {
  const theme = useSelector(
    (state: any) => state.theme.themes[state.theme.index]
  );
  const tutorial = useSelector((state: any) => state.tutorial);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const { handleTest, loading } = useTest();

  useEffect(() => {
    handleTest();
    if (colorScheme === "dark") {
      dispatch(setTheme("dark"));
    } else if (colorScheme === "light") {
      dispatch(setTheme("light"));
    }
  }, [colorScheme, dispatch]);

  // Show welcome screen if tutorial hasn't been completed and not started
  if (!tutorial.isCompleted && tutorial.currentStep === 0) {
    return (
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
              <Welcome />
            </SafeAreaView>
          </SafeAreaProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  // Show tutorial if it's in progress
  if (!tutorial.isCompleted && tutorial.currentStep > 0) {
    return (
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
              <Tutorial />
            </SafeAreaView>
          </SafeAreaProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  // Show normal app if tutorial is completed
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
