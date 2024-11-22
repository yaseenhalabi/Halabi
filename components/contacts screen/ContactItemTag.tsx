import { View, Text, StyleSheet } from "react-native";
import CommonText from "../CommonText";

type ContactItemTagProps = {
    name: string;
}

export default function ContactItemTag({ name }: ContactItemTagProps) {
    return (
        <View style={styles.container}>
            <CommonText weight="regular" size="xsmall" color="semi-full">{name}</CommonText>
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

