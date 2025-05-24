import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { Tag, Contact } from "../../utils/types";
import { LinearGradient } from "expo-linear-gradient";
import getTheme from "../../utils/GetTheme";
import personIcon from "../../assets/images/person-icon-white.png";
import personIconBlack from "../../assets/images/person-icon-black.png";
import CommonText from "../CommonText";
import { contactsToString } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import {
  addSelectedTag,
  removeSelectedTag,
  setTagsSelectionMode,
} from "../../redux/selectTagsSlice";
import * as Haptics from "expo-haptics";

type TagItemProps = {
  tag: Tag;
  contactsWithTag: Contact[];
  onPress: () => void;
  isHighlighted?: boolean;
};

export default function TagItem({
  tag,
  contactsWithTag,
  onPress,
  isHighlighted,
}: TagItemProps) {
  const theme = getTheme();
  const dispatch = useDispatch();
  const selectedTags = useSelector(
    (state: any) => state.tagSelection.selectedTags
  );

  const inTagSelectionMode: boolean = useSelector(
    (state: any) => state.tagSelection.tagsSelectionMode
  );

  const onTagPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (inTagSelectionMode) {
      if (selectedTags.includes(tag.id)) {
        dispatch(removeSelectedTag(tag.id));
      } else {
        dispatch(addSelectedTag(tag.id));
      }
    } else {
      onPress();
    }
  };

  const onTagLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(setTagsSelectionMode(true));
    dispatch(addSelectedTag(tag.id));
  };

  return (
    <TouchableOpacity onPress={onTagPress} onLongPress={onTagLongPress}>
      <LinearGradient
        colors={
          theme.name === "dark"
            ? [
                isHighlighted ? "rgb(20, 20, 20)" : "rgb(0, 0, 0)",
                "rgb(20, 20, 20)",
              ]
            : [
                isHighlighted ? "rgb(240, 240, 240)" : "rgb(255, 255, 255)",
                "rgb(240, 240, 240)",
              ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.container,
          {
            borderColor: selectedTags.includes(tag.id)
              ? theme.name === "dark"
                ? "white"
                : "black"
              : "transparent",
            borderWidth: 1,
          },
        ]}
      >
        <View style={styles.leftContainer}>
          <CommonText numberOfLines={1}>{tag.name}</CommonText>
          {contactsWithTag.length > 0 && (
            <CommonText
              weight="regular"
              size="xsmall"
              color="semi"
              numberOfLines={1}
            >
              {contactsToString(contactsWithTag)}
            </CommonText>
          )}
        </View>
        <View style={styles.rightContainer}>
          <CommonText
            weight="regular"
            size="medium"
            style={Platform.OS === "android" && { top: 2 }}
          >
            {contactsWithTag.length}
          </CommonText>
          <Image
            source={theme.name === "dark" ? personIcon : personIconBlack}
            style={styles.icon}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: "100%",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
    paddingLeft: 10,
  },
  leftContainer: {
    justifyContent: "center",
    width: "90%",
    gap: 3,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 3,
    opacity: 0.5,
  },
  icon: {
    height: 12,
    width: 12,
    alignSelf: "center",
  },
});
