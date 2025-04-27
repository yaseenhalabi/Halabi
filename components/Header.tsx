import { View, Text, StyleSheet } from "react-native";
import { usePathname, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonText from "./CommonText";
import getTheme from "../utils/GetTheme";
import HeaderIcon from "./HeaderIcon";
import whiteSettingsIcon from "../assets/images/settings-icon-white.png";
import whiteBackArrowIcon from "../assets/images/back-arrow-icon-white.png";
import blackSettingsIcon from "../assets/images/settings-icon-black.png";
import blackBackArrowIcon from "../assets/images/back-arrow-icon-black.png";
import { useEffect, useState } from "react";
type HeaderProps = {
  route: any;
};
export default function Header() {
  const theme = getTheme();
  const pathname = usePathname();

  const [showBackArrow, setShowBackArrow] = useState(false);
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
        setCurrentRouteName("Settings");
        break;
      default:
        setCurrentRouteName("Halabi");
        break;
    }
    setShowBackArrow(
      pathname == "/my-contacts/profile" ||
        pathname == "/my-tags/tag" ||
        pathname == "/settings"
    );
  }, [pathname]);

  const onPressSettings = () => {
    router.navigate("settings");
  };
  const onPressBack = () => {
    router.back();
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
          {showBackArrow ? (
            <HeaderIcon
              size={20}
              source={
                theme.name === "dark" ? whiteBackArrowIcon : blackBackArrowIcon
              }
              onPress={onPressBack}
            />
          ) : (
            <HeaderIcon
              size={20}
              source={
                theme.name === "dark" ? whiteSettingsIcon : blackSettingsIcon
              }
              onPress={onPressSettings}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  iconsContainer: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
