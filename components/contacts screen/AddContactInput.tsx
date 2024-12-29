import { View, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createNewContactWithName } from '../../utils/helpers';
import { addContact } from '../../redux/contactsSlice';
import { router } from "expo-router";
import getTheme from '../../utils/GetTheme';

type AddContactInputProps = {
    endEditing: () => void;
};

export default function AddContactInput({ endEditing }: AddContactInputProps) {
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
        const new_contact = createNewContactWithName(text);
        dispatch(addContact(new_contact));
        router.push({ pathname: "/my-contacts/profile", params: { id: new_contact.id } });
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <TextInput
                style={[styles.input, { color: theme.text.full }]}
                autoFocus
                placeholder="Enter name..."
                placeholderTextColor={theme.text.muted}
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