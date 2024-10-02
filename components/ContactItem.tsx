import { StyleSheet, View, TouchableOpacity } from "react-native";
import CommonText from "./CommonText";
import { LinearGradient } from "expo-linear-gradient";
import { Contact } from "../utils/types";
import ContactItemTag from "./ContactItemTag";
import { testTags } from "../utils/testdata";
import { Tag } from "../utils/types";
import { router } from "expo-router";
type ContactItemProps = {
    contact: Contact;
}

export default function ContactItem({ contact }: ContactItemProps) {
    const tags: Tag[] = testTags.filter((tag) => contact.tags.includes(tag.id));
    const tagComponents = tags.map((tag) => <ContactItemTag key={tag.id} name={tag.name} />);
    const onPress = () => {
        router.push({ pathname: "/my-contacts/profile", params: { id: contact.id } });
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['#000000', '#1D1D1D']}
                start={{ x: -.4, y: -.6 }}
                end={{ x: 1.3, y: 1.5 }}
                style={styles.container}
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
        flex: 1,
        width: '100%',
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
        gap: 5,
    },
});


