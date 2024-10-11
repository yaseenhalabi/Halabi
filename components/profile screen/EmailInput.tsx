import ProfileInputContainer from "./ProfileInputContainer";
import { TextInput, StyleSheet } from "react-native";
import getTheme from "../../utils/GetTheme";
type EmailInputProps = {
    value: string;
    onChangeText: (text: string) => void;
}

export default function EmailInput({ value, onChangeText }: EmailInputProps) {
    const theme = getTheme();
    return (
        <ProfileInputContainer title="Email">
            <TextInput 
                value={value}
                style={styles.input} 
                onChangeText={onChangeText} 
                placeholder='Enter Email'
                placeholderTextColor={theme.text.muted}
                autoCapitalize='none'
                autoCorrect={false}
                inputMode="email"
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
    }
})