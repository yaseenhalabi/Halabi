import { View, Text, StyleSheet } from "react-native";
import CommonText from "../CommonText";
import getTheme from "../../utils/GetTheme";

type ContactItemTagProps = {
    name: string;
}

export default function ContactItemTag({ name }: ContactItemTagProps) {
    const theme = getTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.smallTag }]}>
            <CommonText weight="regular" size="xsmall" color="semi-full">{name}</CommonText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});

