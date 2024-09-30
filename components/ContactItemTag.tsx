import { View, Text, StyleSheet } from "react-native";
import { Tag } from "../utils/types";   
import CommonText from "./CommonText";

type ContactItemTagProps = {
    tag: Tag;
}

export default function ContactItemTag({ tag }: ContactItemTagProps) {
    return (
        <View style={styles.container}>
            <CommonText weight="regular" size="xsmall">{tag.name}</CommonText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#232135',
        borderRadius: 30,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});

