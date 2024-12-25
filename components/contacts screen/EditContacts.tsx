import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';
import CommonText from '../CommonText';
import { useSelector, useDispatch } from 'react-redux';
type EditContactsProps = {
    endEditing : () => void;
    trashContacts : () => void;
};

export default function EditContacts({ endEditing, trashContacts }: EditContactsProps) {
    const numberOfSelectedContacts: number = useSelector((state: any) => state.selection.selectedContacts.length);
    return (
        <View style={styles.container}>
            <CommonText size='small' color='full'>Selected {numberOfSelectedContacts} contacts</CommonText>
            <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={endEditing} hitSlop={10}>
                    <SymbolView name="xmark" size={17} tintColor="white" style={styles.symbol} />
                </TouchableOpacity>
                <TouchableOpacity onPress={trashContacts} hitSlop={10}>
                    <SymbolView name="trash" size={17} tintColor="white" style={styles.symbol} />
                </TouchableOpacity>
            </View>
        </View>
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