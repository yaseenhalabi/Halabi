import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';
import CommonText from '../CommonText';
import { useSelector, useDispatch } from 'react-redux';
import { Tag } from '../../utils/types';
import { setTagsSelectionMode, addSelectedTag, removeSelectedTag, resetSelectedTags } from '../../redux/selectTagsSlice';
import { useState } from 'react';

export default function EditTags({ endEditing, trashTags }: { endEditing: () => void, trashTags: () => void }) {
    const numberOfSelectedTags: number = useSelector((state: any) => state.tagSelection.selectedTags.length);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <CommonText size='small' color='full'>Selected {numberOfSelectedTags} tags</CommonText>
            <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={endEditing} hitSlop={10}>
                    <SymbolView name="xmark" size={17} tintColor="white" style={styles.symbol} />
                </TouchableOpacity>
                <TouchableOpacity onPress={trashTags} hitSlop={10}>
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
    symbol: {
        width: 30, 
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 