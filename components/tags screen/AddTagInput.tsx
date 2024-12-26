import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTag } from '../../redux/tagsSlice';
import { Tag } from '../../utils/types';
import { createNewTagWithName } from '../../utils/helpers';

export default function AddTagInput({ endEditing }: { endEditing: () => void }) {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const onConfirmLocal = () => {
        endEditing();
        const newTag: Tag = createNewTagWithName(text);
        dispatch(addTag(newTag));
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoFocus
                placeholder="Enter tag name..."
                placeholderTextColor="#ccc"
                onChangeText={setText}
                autoCapitalize="words"
                autoComplete='off'
                returnKeyType='done'
                keyboardAppearance='dark'
                autoCorrect={false}
            />
            <TouchableOpacity onPress={endEditing} hitSlop={10}>
                <SymbolView name="xmark" size={17} tintColor="white" style={styles.symbol} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirmLocal} hitSlop={10}>
                <SymbolView name="checkmark" size={17} tintColor="white" style={styles.symbol} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 10,
        gap: 20
    },
    input: {
        flex: 1, 
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 10,
        height: '100%',
    },
    symbol: {
        width: 30, 
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 