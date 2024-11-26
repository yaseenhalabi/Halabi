import ProfileInputContainer from "./ProfileInputContainer";
import { TextInput, StyleSheet } from "react-native";
import getTheme from "../../utils/GetTheme";

type NotesInputProps = {
    value: string;
    onChangeText: (text: string) => void;
}

export default function NotesInput({ value, onChangeText }: NotesInputProps) {
    const theme = getTheme();
    return (
        <ProfileInputContainer title="Notes" hideTitle>
            <TextInput 
                value={value}
                style={styles.input} 
                onChangeText={onChangeText} 
                placeholder='Enter notes'
                placeholderTextColor={theme.text.muted}
                autoCapitalize='sentences'
                autoCorrect={true}
                numberOfLines={4}
                multiline
                keyboardAppearance='dark'
            />
        </ProfileInputContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        width: '100%',
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        height: 80,
        textAlignVertical: 'top',
    }
})