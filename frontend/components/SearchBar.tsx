import React, { forwardRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GetTheme from "../utils/GetTheme";
import { router } from "expo-router";
import searchIcon from "../assets/images/search-icon-white.png";
import searchIconBlack from "../assets/images/search-icon-black.png";
import xIcon from "../assets/images/x-icon-white.png";
import xIconBlack from "../assets/images/x-icon-black.png";

type SearchBarProps = {
  onChangeText: (text: string) => void;
  value: string;
  selectedItemRoutingInfo?: {
    pathName: string;
    id: string;
  };
};

const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ onChangeText, value, selectedItemRoutingInfo }, ref) => {
    const theme = GetTheme();

    // Show/hide the small "X" only if there's text
    const hasText = value.length > 0;

    const handleSubmitEditing = () => {
      if (selectedItemRoutingInfo) {
        router.push({
          pathname: selectedItemRoutingInfo.pathName,
          params: { id: selectedItemRoutingInfo.id },
        });
      }
    };
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={
            theme.name === "dark"
              ? ["#1D142A", "#2F1B1E"]
              : ["#FFFFFF", "#F0F0F0"]
          }
          start={{ x: -0.5, y: 0 }}
          end={{ x: 1.3, y: 1.5 }}
          style={styles.insideContainer}
        >
          <Image
            source={theme.name === "dark" ? searchIcon : searchIconBlack}
            style={styles.icon}
          />
          <TextInput
            ref={ref} // <-- forwardRef attaches the parent ref here
            style={[
              styles.input,
              { color: theme.text.full },
              Platform.OS === "android" ? styles.androidInput : null,
            ]}
            placeholder="Search"
            placeholderTextColor={theme.text.semi}
            onChangeText={onChangeText}
            value={value}
            onSubmitEditing={handleSubmitEditing}
            keyboardAppearance={theme.name === "dark" ? "dark" : "light"}
            autoCapitalize="words"
            autoComplete="off"
            autoCorrect={false}
            returnKeyType="search"
          />
          {hasText && (
            <CancelSearch
              onClear={() => {
                // Clear text locally
                onChangeText("");
              }}
            />
          )}
        </LinearGradient>
      </View>
    );
  }
);

type CancelSearchProps = {
  onClear: () => void;
};

function CancelSearch({ onClear }: CancelSearchProps) {
  const theme = GetTheme();
  return (
    <TouchableOpacity onPress={onClear} hitSlop={25}>
      <Image
        source={theme.name === "dark" ? xIcon : xIconBlack}
        style={{ width: 15, height: 15, opacity: 0.55, marginRight: 10 }}
      />
    </TouchableOpacity>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
  },
  insideContainer: {
    width: "100%",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 40,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    paddingVertical: 0,
    lineHeight: 20,
  },
  androidInput: {
    textAlignVertical: "center",
  },
  icon: {
    width: 15,
    height: 15,
    opacity: 0.77,
    marginRight: 10,
  },
});
