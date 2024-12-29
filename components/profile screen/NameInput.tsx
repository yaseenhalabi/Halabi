import { TextInput, StyleSheet } from 'react-native';
import getTheme from '../../utils/GetTheme';
type NameInputProps = {
    onChangeText: (text: string) => void;
    value: string;
}
export default function NameInput({ onChangeText, value}: NameInputProps) {
    const theme = getTheme();
    return (
        <TextInput 
            style={[styles.input, { color: theme.text.full }]} 
            onChangeText={onChangeText} 
            placeholder='Enter name'
            placeholderTextColor={theme.text.semi}
            autoCapitalize='words'
            autoCorrect={false}
            returnKeyType='done'
            maxLength={35}
            value={value}
            keyboardAppearance='dark'
        />
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 28,
        fontFamily: 'Poppins-Medium',
        width: '100%',
        overflow: 'hidden',
    }
})