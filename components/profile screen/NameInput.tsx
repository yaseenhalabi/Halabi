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
            style={styles.input} 
            onChangeText={onChangeText} 
            placeholder='Enter name'
            placeholderTextColor={theme.text.muted}
            autoCapitalize='words'
            autoCorrect={false}
            returnKeyType='done'
            maxLength={35}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 28,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        width: '100%',
        overflow: 'hidden',

    }
})