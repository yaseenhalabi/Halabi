import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import getTheme from "../utils/GetTheme";
import { Keyboard } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
type PageContainerProps = {
  children: React.ReactNode;
  onOverScrollTop?: () => void;
  scrollEnabled?: boolean;
  style?: any;
};

export default function PageContainer({
  children,
  style,
  scrollEnabled,
  onOverScrollTop,
}: PageContainerProps) {
  const theme = getTheme();
  const handleOverScroll = (yOffset: number) => {
    if (!onOverScrollTop) return;
    if (yOffset < -10) onOverScrollTop();
  };
  if (scrollEnabled) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          enableAutomaticScroll
          onScrollEndDrag={(event) =>
            handleOverScroll(event.nativeEvent.contentOffset.y)
          }
          contentContainerStyle={{ ...styles.container, ...style }}
          style={{ backgroundColor: theme.background }}
        >
          {children}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.background,
          ...style,
        }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    flexGrow: 1,
  },
});
