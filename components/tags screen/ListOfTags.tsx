import { Text, FlatList, StyleSheet } from "react-native";
import { Tag } from "../../utils/types";
import getTheme from "../../utils/GetTheme";
import TagItem from "./TagItem";
import { getContactsWithTag, getFilteredTags } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { setTagsSelectionMode } from '../../redux/selectTagsSlice';

type ListOfTagsProps = {
    tags: Tag[]
}

export default function ListOfTags({ tags }: ListOfTagsProps) {
    const contacts = useSelector((state: any) => state.contacts);
    const theme = getTheme();
    const dispatch = useDispatch();

    const handleTagPress = (tagId: string) => {
        console.log(`Tag with id ${tagId} pressed`);
    };

    return (
        <FlatList
            data={tags}
            style={{ ...styles.container, backgroundColor: theme.background }}
            renderItem={({ item }) => 
                <TagItem 
                    tag={item} 
                    contactsWithTag={getContactsWithTag(item, contacts)} 
                    onPress={() => handleTagPress(item.id)} 
                />
            }
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 5, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: '10%',
        width: '100%',
    },
});
