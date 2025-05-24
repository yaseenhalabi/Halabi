import { View, Text, StatusBar } from "react-native";
import { Redirect, Slot, Stack } from "expo-router";
import Header from "../../components/Header";
import getTheme from "../../utils/GetTheme";
import { StyleSheet } from "react-native";
import CommonText from "../../components/CommonText";
import Tutorial from "../../components/tutorial/Tutorial";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { detectNewContacts } from "../../utils/detectNewContacts";
import { setContactSnapshots } from "../../redux/contactSnapshotsSlice";
import {
  showNewContactsBanner,
  hideNewContactsBanner,
} from "../../redux/popupBannerSlice";
import NewContactsPopupBanner from "../../components/contacts screen/NewContactsPopupBanner";
import { router } from "expo-router";

export default function AppLayout() {
  const theme = getTheme();
  const dispatch = useDispatch();

  // New contacts detection state
  const contactSnapshots: string[] = useSelector(
    (state: any) => state.contactSnapshots
  );

  const popupBanner = useSelector((state: any) => state.popupBanner);

  // Detection logic moved from my-contacts/index.tsx
  useFocusEffect(
    useCallback(() => {
      const checkForNewContacts = async () => {
        try {
          const newIds = await detectNewContacts(contactSnapshots);
          if (newIds.length > 0) {
            dispatch(showNewContactsBanner(newIds));
            const updatedSnapshots = [...contactSnapshots, ...newIds];
            dispatch(setContactSnapshots(updatedSnapshots));
          }
        } catch (error) {
          console.error("Error checking for new contacts:", error);
        }
      };

      // Initial check
      checkForNewContacts();

      // Set up polling every 3 seconds
      const interval = setInterval(checkForNewContacts, 3000);

      return () => {
        // Clear the interval on cleanup
        clearInterval(interval);
      };
    }, [contactSnapshots, dispatch])
  );

  const handleAddNewContacts = () => {
    router.push("/new-contacts");
  };

  const handleDismissBanner = () => {
    dispatch(hideNewContactsBanner());
  };

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
          <Stack.Screen
            name="new-contacts"
            options={{ presentation: "modal" }}
          />
        </Stack>
        <NewContactsPopupBanner
          newContactsCount={popupBanner.newContactIds.length}
          onAddPress={handleAddNewContacts}
          onDismiss={handleDismissBanner}
          visible={popupBanner.visible}
        />
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
        <Stack.Screen
          name="new-contacts"
          options={{ presentation: "modal", header: () => null }}
        />
      </Stack>
      <NewContactsPopupBanner
        newContactsCount={popupBanner.newContactIds.length}
        onAddPress={handleAddNewContacts}
        onDismiss={handleDismissBanner}
        visible={popupBanner.visible}
      />
    </>
  );
}
