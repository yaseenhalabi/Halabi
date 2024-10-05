import { Text, FlatList, StyleSheet } from "react-native";
import { Tag } from "../utils/types";
import getTheme from "../utils/GetTheme";
import TagItem from "./TagItem";
import { getContactsWithTag, getFilteredTags } from "../utils/helpers";
import { useSelector } from "react-redux";

type ListOfTagsProps = {
    tags: Tag[]
}

export default function ListOfTags({ tags }: ListOfTagsProps) {
    const contacts = useSelector((state: any) => state.contacts);
    const theme = getTheme();
    return (
        <FlatList
            data={tags}
            style={{ ...styles.container, backgroundColor: theme.background }}
            renderItem={({ item }) => 
                <TagItem 
                    tag={item} 
                    contactsWithTag={getContactsWithTag(item, contacts)} 
                    onPress={() => {}} 
                />
            }
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 5, flexGrow: 1, height: '110%' }}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
});
