import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CommonText from "../CommonText";
import { Tag } from "../../utils/types";
import * as Haptics from "expo-haptics";
import { removeTagFromContact } from "../../redux/contactsSlice";
import getTheme from "../../utils/GetTheme";

type ProfileTagProps = {
  contactId: string;
  tagId: string;
  onPress: () => void;
  canDelete?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
};

export default function ProfileTag({
  contactId,
  tagId,
  onPress,
  canDelete,
  isHighlighted,
}: ProfileTagProps) {
  const theme = getTheme();
  const tags = useSelector((state: any) => state.tags);
  const tag = tags.find((tag: Tag) => tag.id === tagId);
  const dispatch = useDispatch();
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };
  const onLongPress = () => {
    if (!canDelete) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(removeTagFromContact({ contactId, tagId }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        delayLongPress={500}
        onLongPress={onLongPress}
        hitSlop={10}
      >
        <View
          style={[
            styles.tagContainer,
            {
              backgroundColor: theme.smallTag,
              borderWidth: isHighlighted ? 0.5 : 0,
              borderColor: "grey",
            },
          ]}
        >
          <CommonText weight="regular" size="small">
            {tag.name}
          </CommonText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  tagContainer: {
    borderRadius: 30,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
