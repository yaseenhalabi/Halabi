import { StyleSheet, View, TouchableOpacity, Keyboard } from "react-native";
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
import * as Haptics from 'expo-haptics';
type ContactItemProps = {
    contact: Contact;
    isSelected?: boolean;
}

export default function ContactItem({ contact, isSelected }: ContactItemProps) {
    const theme = getTheme();
    const tags: Tag[] = useSelector((state: any) => state.tags);
    const contactTags: Tag[] = tags.filter((tag: Tag) => contact.tags.includes(tag.id));
    const dispatch = useDispatch(); 
    // Maximum number of tags to display before summarizing
    const maxTags = 4;
    const displayedTags = contactTags.slice(0, maxTags);
    const remainingTags = contactTags.length - displayedTags.length;

    const tagComponents: React.ReactNode[] = displayedTags.map((tag: Tag) => (
        <ContactItemTag key={tag.id} name={tag.name} />
    ));

    // Add "+n more" if there are more tags than maxTags
    if (remainingTags > 0) {
        tagComponents.push(
            <CommonText key="more" size="xsmall" weight="light" color="semi">{`+${remainingTags} tags`}</CommonText>
        );
    }
    const inContactSelectionMode: boolean = useSelector((state: any) => state.selection.contactsSelectionMode);
    const onPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        if (inContactSelectionMode) {
            if (isSelected) {
                dispatch({ type: 'selection/removeSelectedContact', payload: { id: contact.id } });
            }
            else {
                dispatch(addSelectedContact({ id: contact.id }));
            }
        }
        else {
            router.push({ pathname: "/my-contacts/profile", params: { id: contact.id } });
            Keyboard.dismiss();
        }
    }

    const onLongPress = () => { 
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        dispatch(setContactsSelectionMode(true));
        dispatch(addSelectedContact({ id: contact.id }));
    }

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <LinearGradient
                colors={theme.name === "dark" ? ['#000000', '#1D1D1D'] : ['#FFFFFF', '#F0F0F0']}
                start={{ x: -.4, y: -.6 }}
                end={{ x: 1.3, y: 1.5 }}
                style={[styles.container, { borderColor: isSelected ? theme.text.full : 'transparent', borderWidth: 1 }]}
            >
                <CommonText size="medium">{contact.name}</CommonText>
                <View style={styles.tagsContainer}>
                    {tagComponents}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 5,
        borderWidth: 1,
        gap: 3
    },
    tagsContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
        gap: 5,
    },
});
