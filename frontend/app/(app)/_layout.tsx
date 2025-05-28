import { StatusBar } from "react-native";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Contacts from "expo-contacts";
import Header from "../../components/Header";
import getTheme from "../../utils/GetTheme";
import NewContactsPopupBanner from "../../components/contacts screen/NewContactsPopupBanner";
import {
  setAwaitingReviewIds,
  setAwaitingBannerIds,
  moveFromBannerToReview,
} from "../../redux/newContactReviewSlice";

export default function AppLayout() {
  const theme = getTheme();
  const dispatch = useDispatch();

  const reviewedIds = useSelector(
    (state: any) => state.newContactReview.reviewedIds
  );
  const awaitingReviewIds = useSelector(
    (state: any) => state.newContactReview.awaitingReviewIds
  );
  const awaitingBannerIds = useSelector(
    (state: any) => state.newContactReview.awaitingBannerIds
  );

  const pollContacts = async () => {
    try {
      const { granted } = await Contacts.requestPermissionsAsync();
      if (!granted) {
        console.warn("Contact permissions not granted");
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.ID],
      });

      if (data.length < 1) {
        return;
      }

      const currentContactIds = data
        .map((contact) => contact.id)
        .filter((id) => id !== undefined) as string[];

      // Find contacts not in reviewedIds
      const unprocessedIds = currentContactIds.filter(
        (id) => !reviewedIds.includes(id)
      );

      // Find which unprocessed contacts are not in awaitingBannerIds or awaitingReviewIds
      const newBannerIds = unprocessedIds.filter(
        (id) =>
          !awaitingBannerIds.includes(id) && !awaitingReviewIds.includes(id)
      );

      // Add new IDs to awaitingBannerIds if there are any
      if (newBannerIds.length > 0) {
        const updatedBannerIds = [...awaitingBannerIds, ...newBannerIds];
        dispatch(setAwaitingBannerIds(updatedBannerIds));
      }
    } catch (error) {
      console.error("Error polling contacts:", error);
    }
  };

  const handleBannerDismiss = () => {
    // Move all awaitingBannerIds to awaitingReviewIds
    dispatch(moveFromBannerToReview());
  };

  const handleAddPress = () => {
    // Navigate to new-contacts screen with openedfrombanner=true
    router.push("/new-contacts?openedfrombanner=true");
  };

  useEffect(() => {
    // Poll immediately on mount
    pollContacts();

    // Set up polling interval (every 5 seconds)
    const interval = setInterval(pollContacts, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [reviewedIds, awaitingReviewIds, awaitingBannerIds]);

  const screenOptions = {
    fullScreenGestureEnabled: true,
    header: () => <Header />,
  };

  return (
    <>
      <StatusBar
        barStyle={theme.name == "light" ? "dark-content" : "light-content"}
        backgroundColor={theme.background}
      />
      <NewContactsPopupBanner
        newContactsCount={awaitingBannerIds.length}
        onAddPress={handleAddPress}
        onDismiss={handleBannerDismiss}
        visible={awaitingBannerIds.length > 0}
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
    </>
  );
}
