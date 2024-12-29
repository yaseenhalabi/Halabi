import { TouchableOpacity, View, StyleSheet } from "react-native";
import CommonText from "../CommonText";
import getTheme from "../../utils/GetTheme";
type SaveButtonProps = {
    onPress: () => void;
}

export default function SaveButton({onPress} : SaveButtonProps) {
    const theme = getTheme();
    return (
        <TouchableOpacity onPress={onPress} style={[styles.saveButton, { borderColor: theme.text.muted }]}>
            <CommonText size='medium' color='full'>SAVE</CommonText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    saveButton: {
        width: '100%',
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    }
});
