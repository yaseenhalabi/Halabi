import { View, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTag } from '../../redux/tagsSlice';
import { Tag } from '../../utils/types';
import { createNewTagWithName } from '../../utils/helpers';
import getTheme from '../../utils/GetTheme';

export default function AddTagInput({ endEditing }: { endEditing: () => void }) {
    const [text, setText] = useState('');
    const theme = getTheme();
    const dispatch = useDispatch();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    const onConfirmLocal = () => {
        endEditing();
        const newTag: Tag = createNewTagWithName(text);
        dispatch(addTag(newTag));
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <TextInput
                style={[styles.input, { color: theme.text.full }]}
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
                <SymbolView name="xmark" size={17} tintColor={theme.text.full} style={styles.symbol} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirmLocal} hitSlop={10}>
                <SymbolView name="checkmark" size={17} tintColor={theme.text.full} style={styles.symbol} />
            </TouchableOpacity>
        </Animated.View>
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