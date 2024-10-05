import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Tag } from '../../utils/types';
import CommonText from '../CommonText';

type ProfileTagProps = {    
    tagId: string;
    onPress?: () => void;
    onLongPress?: () => void;
}

export default function ProfileTag({ tagId, onPress, onLongPress }: ProfileTagProps) {
    const tags = useSelector((state: any) => state.tags);
    const tag = tags.find((tag: Tag) => tag.id === tagId);

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.tagContainer}>
                <CommonText weight="regular" size="small">{tag.name}</CommonText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tagContainer: {
        backgroundColor: '#232135',
        borderRadius: 30,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
});