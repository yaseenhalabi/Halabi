import { Text, FlatList, StyleSheet } from "react-native";
import { Tag } from "../utils/types";
import getTheme from "../utils/GetTheme";
import TagItem from "./TagItem";
import { testContacts } from "../utils/testdata";
import { getContactsWithTag, getFilteredTags } from "../utils/helpers";
type ListOfTagsProps = {
    tags: Tag[]
}

export default function ListOfTags({ tags }: ListOfTagsProps) {
    const theme = getTheme();
    return (
        <FlatList
            data={tags}
            style={{ ...styles.container, backgroundColor: theme.background }}
            renderItem={({ item }) => 
                <TagItem 
                    tag={item} 
                    contactsWithTag={getContactsWithTag(item, testContacts)} 
                    onPress={() => {}} 
                />
            }
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 5, flexGrow: 1 }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
});
