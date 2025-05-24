import { StyleSheet, View, TouchableOpacity, Keyboard } from "react-native";
import { useMemo, useRef } from "react";
import CommonText from "../CommonText";
import { LinearGradient } from "expo-linear-gradient";
import { Contact } from "../../utils/types";
import ContactItemTag from "./ContactItemTag";
import { Tag } from "../../utils/types";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import getTheme from "../../utils/GetTheme";
import { addSelectedContact } from "../../redux/selectContactsSlice";
import { setContactsSelectionMode } from "../../redux/selectContactsSlice";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import defaultPfpWhite from "../../assets/images/default-pfp-white.png";
import defaultPfpBlack from "../../assets/images/default-pfp-black.png";
type ContactItemProps = {
  contact: Contact;
  isSelected?: boolean;
  isHighlighted?: boolean;
  longPressDisabled?: boolean;
};

const MAX_CHARACTER_COUNT = 25;

export default function ContactItem({
  contact,
  isSelected,
  isHighlighted,
  longPressDisabled,
}: ContactItemProps) {
  const renderCount = useRef(0);
  renderCount.current++;

  const theme = getTheme();
  const tags: Tag[] = useSelector((state: any) => state.tags);
  const contactTags: Tag[] = tags
    .filter((tag: Tag) => contact.tags.includes(tag.id))
    .sort((a, b) => a.name.length - b.name.length);
  const dispatch = useDispatch();
  // limit how many tags are shown (by character)
  let tagCharacterCount = 0;
  let i = 0;
  while (tagCharacterCount < MAX_CHARACTER_COUNT && i < contactTags.length) {
    tagCharacterCount += contactTags[i].name.length + 4;
    i++;
  }

  const displayedTags = contactTags.slice(0, i);

  const tagComponents = useMemo(() => {
    if (i < contactTags.length) {
      return (
        <>
          {displayedTags.map((tag: Tag) => (
            <ContactItemTag key={tag.id} name={tag.name} />
          ))}
          <CommonText key="more" size="xsmall" weight="light" color="semi">{`+${
            contactTags.length - i
          } tag${contactTags.length - i === 1 ? "" : "s"}`}</CommonText>
        </>
      );
    }
    return displayedTags.map((tag: Tag) => (
      <ContactItemTag key={tag.id} name={tag.name} />
    ));
  }, [contact]);

  const inContactSelectionMode: boolean = useSelector(
    (state: any) => state.selection.contactsSelectionMode
  );

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (inContactSelectionMode) {
      if (isSelected) {
        dispatch({
          type: "selection/removeSelectedContact",
          payload: { id: contact.id },
        });
      } else {
        dispatch(addSelectedContact({ id: contact.id }));
      }
    } else {
      router.push({
        pathname: "/my-contacts/profile",
        params: { id: contact.id },
      });
      Keyboard.dismiss();
    }
  };

  const onLongPress = () => {
    if (longPressDisabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(setContactsSelectionMode(true));
    dispatch(addSelectedContact({ id: contact.id }));
  };

  // const defaultProfilePic =
  //   theme.name === "dark" ? defaultPfpBlack : defaultPfpWhite;

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <LinearGradient
        colors={
          theme.name === "dark"
            ? [isHighlighted ? "#1D1D1D" : "#000000", "#1D1D1D"]
            : [isHighlighted ? "#F0F0F0" : "#FFFFFF", "#F0F0F0"]
        }
        start={{ x: -0.4, y: -0.6 }}
        end={{ x: 1.3, y: 1.5 }}
        style={[
          styles.container,
          {
            borderColor: isSelected ? theme.text.full : "transparent",
            borderWidth: 1,
          },
        ]}
      >
        {/* {contact.photo ? (
          <Image
            placeholder={{ blurhash: contact.photo.blurHash }}
            source={contact.photo.url}
            style={styles.profilePic}
          />
        ) : (
          <Image source={defaultProfilePic} style={styles.profilePic} />
        )} */}
        <View style={styles.container}>
          <CommonText size="medium">{contact.name}</CommonText>
          {displayedTags.length > 0 && (
            <View style={styles.tagsContainer}>{tagComponents}</View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
    paddingRight: 10,
    height: 65,
    gap: 3,
  },
  tagsContainer: {
    flexDirection: "row",
    overflow: "hidden",
    gap: 5,
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
});
