import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  return (
    <View style={styles.container}>
      <BlurView
        intensity={5}
        style={{
          borderRadius: 30,
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <LinearGradient
        colors={["#15616099", "#8B56D199"]}
        end={{ x: 1, y: 0 }}
        style={styles.tabBar}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const icon =
            options.tabBarIcon &&
            options.tabBarIcon({ focused: state.index === index });
          const isFocused = state.index === index;
          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBarItem}
            >
              {icon}
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: "25%",
    width: "50%",
    borderRadius: 100,
    overflow: "hidden",
    zIndex: 1,
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
  },

  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
