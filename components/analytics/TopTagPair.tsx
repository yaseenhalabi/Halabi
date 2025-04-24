import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Contact } from "../../utils/types";
import { Tag } from "../../utils/types";
import CommonText from "../CommonText";
import getTheme from "../../utils/GetTheme";
import { router } from "expo-router";

type Props = {
  contacts: Contact[];
  tags: Tag[];
};
export default function TopTagPair({ contacts, tags }: Props) {
  const theme = getTheme();
  const getTopPair = (): Tag[] => {
    if (contacts.length === 0) return [];

    let topPair = [];
    let frequencyMap = new Map<String, number>();
    const sortedContacts: Contact[] = contacts
      .filter((c) => c.tags.length > 1)
      .sort((a, b) => b.tags.length - a.tags.length);

    for (let index = 0; index < sortedContacts.length; index++) {
      const currTags = sortedContacts[index].tags;
      for (let i = 0; i < currTags.length - 1; i++) {
        for (let j = i + 1; j < currTags.length; j++) {
          let key = `${currTags[i]}|${currTags[j]}`;
          const prevCount = frequencyMap.get(key) ?? 0;
          frequencyMap.set(key, prevCount + 1);
        }
      }
    }

    if (frequencyMap.size === 0) return [];
    const mostCommonPairString = [...frequencyMap.entries()].sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    const mostCommonPairStringList: String[] = mostCommonPairString.split("|");

    const mostCommonPair: Tag[] = mostCommonPairStringList.map(
      (id) => tags.find((tag) => tag.id === id) || { name: "", id: "" }
    );

    return mostCommonPair;
  };

  let topTagPair = getTopPair();
  if (topTagPair.length === 0)
    return <CommonText size="xsmall">Not enough tags</CommonText>;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/my-tags/tag",
            params: { id: topTagPair[0].id },
          })
        }
      >
        <View
          style={[styles.tagContainer, { backgroundColor: theme.smallTag }]}
        >
          <CommonText>{topTagPair[0].name}</CommonText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/my-tags/tag",
            params: { id: topTagPair[1].id },
          })
        }
      >
        <View
          style={[styles.tagContainer, { backgroundColor: theme.smallTag }]}
        >
          <CommonText>{topTagPair[1].name}</CommonText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
  tagContainer: {
    borderRadius: 30,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
