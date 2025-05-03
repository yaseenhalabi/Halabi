import { Tabs } from "expo-router";
import TabBar from "../../../components/bottom tab navigator/TabBar";
import TabBarIcon from "../../../components/bottom tab navigator/TabBarIcon";
import peopleIconWhite from "../../../assets/images/people-icon-white.png";
import peopleIconBlurWhite from "../../../assets/images/people-icon-white-blur.png";
import tagsIconWhite from "../../../assets/images/tags-icon-white.png";
import tagsIconBlurWhite from "../../../assets/images/tags-icon-white-blur.png";
import analyticsIcon from "../../../assets/images/analytics-icon.png";
import analyticsIconBlur from "../../../assets/images/analytics-icon-blur.png";
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen redirect name="index" />
      <Tabs.Screen
        name="my-contacts"
        options={{
          title: "My Contacts",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={peopleIconWhite}
              blurSource={peopleIconBlurWhite}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-tags"
        options={{
          title: "My Tags",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={tagsIconWhite}
              blurSource={tagsIconBlurWhite}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          freezeOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              source={analyticsIcon}
              blurSource={analyticsIconBlur}
              blurSize={44}
            />
          ),
        }}
      />
    </Tabs>
  );
}
