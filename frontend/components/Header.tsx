import { View, Text, StyleSheet } from "react-native";
import { usePathname, router } from "expo-router";
import CommonText from "./CommonText";
import getTheme from "../utils/GetTheme";
import HeaderIcon from "./HeaderIcon";
import whiteSettingsIcon from "../assets/images/settings-icon-white.png";
import whiteBackArrowIcon from "../assets/images/back-arrow-icon-white.png";
import blackSettingsIcon from "../assets/images/settings-icon-black.png";
import blackBackArrowIcon from "../assets/images/back-arrow-icon-black.png";
import { useEffect, useState } from "react";

export default function Header() {
  const theme = getTheme();
  const pathname = usePathname();
  const [currentRouteName, setCurrentRouteName] = useState("My Contacts");
  useEffect(() => {
    switch (pathname) {
      case "/my-contacts":
        setCurrentRouteName("Contacts");
        break;
      case "/my-contacts/profile":
        setCurrentRouteName("Contacts");
        break;
      case "/my-tags":
        setCurrentRouteName("Tags");
        break;
      case "/my-tags/tag":
        setCurrentRouteName("Tags");
        break;
      case "/analytics":
        setCurrentRouteName("Analytics");
        break;
      case "/settings":
        break;
      default:
        setCurrentRouteName("Halabi");
        break;
    }
  }, [pathname]);

  const onPressSettings = () => {
    router.navigate("settings");
  };

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: theme.background }}>
        <View style={styles.headerTextContainer}>
          <CommonText size="small" weight="bold">
            {currentRouteName}
          </CommonText>
        </View>
        <View style={styles.iconsContainer}>
          <HeaderIcon
            size={20}
            source={
              theme.name === "dark" ? whiteSettingsIcon : blackSettingsIcon
            }
            onPress={onPressSettings}
            style={{ position: "absolute", right: 0 }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  iconsContainer: {
    width: "100%",
    gap: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  headerTextContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
