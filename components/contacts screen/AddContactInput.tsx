import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewContactWithName } from '../../utils/helpers';
import { addContact } from '../../redux/contactsSlice';
import { router } from "expo-router";
type AddContactInputProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export default function AddContactInput({ onConfirm, onCancel }: AddContactInputProps) {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const onConfirmLocal = () => {
        console.log(createNewContactWithName(text));
        onConfirm();
        const new_contact = createNewContactWithName(text);
        dispatch(addContact(new_contact));
        router.push({ pathname: "/my-contacts/profile", params: { id: new_contact.id } });
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoFocus
                placeholder="Enter name..."
                placeholderTextColor="#ccc"
                onChangeText={setText}
                autoCapitalize="words"
                autoComplete='off'
                returnKeyType='done'
                keyboardAppearance='dark'
            />
            <TouchableOpacity onPress={onCancel} hitSlop={10}>
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