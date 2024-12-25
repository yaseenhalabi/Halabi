import { TouchableOpacity, View, StyleSheet } from "react-native";
import CommonText from "../CommonText";
type SaveButtonProps = {
    onPress: () => void;
}

export default function SaveButton({onPress} : SaveButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.saveButton}>
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
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center', 
    }
});
