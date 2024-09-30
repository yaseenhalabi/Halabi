import { StyleSheet, View, TouchableOpacity } from "react-native";
import CommonText from "./CommonText";
import { LinearGradient } from "expo-linear-gradient";
import { Contact } from "../utils/types";
import ContactItemTag from "./ContactItemTag";
type ContactItemProps = {
    contact: Contact;
    onPress: () => void;
}

export default function ContactItem({ contact, onPress }: ContactItemProps) {
    const tags = contact.tags.map((tag) => <ContactItemTag key={tag.id} tag={tag} />);
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
                {tags}
            </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 48,
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


