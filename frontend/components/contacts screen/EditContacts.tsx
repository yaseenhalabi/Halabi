import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SymbolView } from 'expo-symbols';
import CommonText from '../CommonText';
import { useSelector, useDispatch } from 'react-redux';
import getTheme from '../../utils/GetTheme';
import { useEffect, useRef } from 'react';

type EditContactsProps = {
    endEditing : () => void;
    trashContacts : () => void;
};

export default function EditContacts({ endEditing, trashContacts }: EditContactsProps) {
    const theme = getTheme();
    const numberOfSelectedContacts = useSelector((state: any) => state.selection.selectedContacts.length);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <CommonText size='small' color='full'>Selected {numberOfSelectedContacts} contacts</CommonText>
            <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={endEditing} hitSlop={10}>
                    <SymbolView name="xmark" size={17} tintColor={theme.text.full} style={styles.symbol} />
                </TouchableOpacity>
                <TouchableOpacity onPress={trashContacts} hitSlop={10}>
                    <SymbolView name="trash" size={17} tintColor={theme.text.full} style={styles.symbol} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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