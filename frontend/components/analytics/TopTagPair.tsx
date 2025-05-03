import React, { memo, useMemo } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Contact, Tag } from "../../utils/types";
import CommonText from "../CommonText";
import getTheme from "../../utils/GetTheme";
import { router } from "expo-router";

type Props = {
  contacts: Contact[];
  tags: Tag[];
};

function TopTagPair({ contacts, tags }: Props) {
  // theme is assumed stable; memoize so it doesn't trigger re-renders
  const theme = getTheme();

  // heavy computation runs only when contacts or tags change
  const topPair = useMemo<Tag[]>(() => {
    const freq = new Map<string, number>();

    for (const c of contacts) {
      if (c.tags.length < 2) continue;
      for (let i = 0; i < c.tags.length - 1; i++) {
        for (let j = i + 1; j < c.tags.length; j++) {
          const [a, b] = [c.tags[i], c.tags[j]].sort();
          const key = `${a}|${b}`;
          freq.set(key, (freq.get(key) ?? 0) + 1);
        }
      }
    }

    if (freq.size === 0) return [];

    // find the single highest-frequency pair:
    let bestKey = "";
    let bestCount = -Infinity;
    for (const [key, count] of freq.entries()) {
      if (count > bestCount) {
        bestCount = count;
        bestKey = key;
      }
    }

    return bestKey.split("|").map(
      (id) =>
        tags.find((t) => t.id === id) || {
          id: "",
          name: "",
        }
    );
  }, [contacts, tags]);

  // if not enough tags, show fallback
  if (topPair.length < 2)
    return (
      <View
        style={{
          height: 300,
          width: Dimensions.get("window").width * 0.9 - 30,
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.name === "dark" ? "#121212" : "#f5f4f2",
          borderRadius: 20,
        }}
      >
        <CommonText size="xsmall">Not enought data.</CommonText>
        <CommonText size="xsmall">Tag more contacts</CommonText>
      </View>
    );

  return (
    <View style={styles.container}>
      {topPair.map((tag) => (
        <TouchableOpacity
          key={tag.id}
          onPress={() =>
            router.push({
              pathname: "/my-tags/tag",
              params: { id: tag.id },
            })
          }
          style={[styles.tagContainer, { backgroundColor: theme.smallTag }]}
        >
          <CommonText>{tag.name}</CommonText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default memo(TopTagPair);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    height: 30,
  },
  tagContainer: {
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 25,
  },
});
