import React from "react";
import { View, Image, StyleSheet } from "react-native";

type tabBarIconProps = {
  focused: boolean;
  source: any;
  blurSource: any;
  blurSize?: number;
};

export default function TabBarIcon({
  focused,
  source,
  blurSource,
  blurSize,
}: tabBarIconProps) {
  return (
    <View style={styles.container}>
      {focused && (
        <Image
          source={blurSource}
          style={{
            ...styles.blurIcon,
            width: blurSize || 45,
            height: blurSize || 45,
          }}
        />
      )}
      <Image source={source} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  blurIcon: {
    position: "absolute",
    width: 45,
    height: 45,
  },
});
