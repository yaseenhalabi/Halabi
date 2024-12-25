import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonText from '../CommonText';
import { Tag } from '../../utils/types';
import { removeTagFromContact } from '../../redux/contactsSlice';
import * as Haptics from 'expo-haptics';
type ProfileTagProps = {    
    contactId: string;
    tagId: string;
    onPress?: () => void;
    canDelete?: boolean;
};

export default function ProfileTag({ contactId, tagId, onPress, canDelete }: ProfileTagProps) {
    const tags = useSelector((state: any) => state.tags);
    const tag = tags.find((tag: Tag) => tag.id === tagId);
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (onPress) {
            onPress();
        }
    }
    const onLongPress = () => {
        if (!canDelete) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsDeleting(true);
    };

    const handleDelete = () => {
    dispatch(removeTagFromContact({ contactId: contactId, tagId: tagId }));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={isDeleting ? handleDelete : handlePress} onLongPress={onLongPress} hitSlop={10}>
                <View style={[styles.tagContainer, {backgroundColor: isDeleting ? 'black' : '#232135', borderWidth: isDeleting ? 1 : 0}]}>
                    <CommonText weight="regular" size="small" style={isDeleting ? {color: 'red'} : {}}>{!isDeleting ? tag?.name || 'Unknown Tag' : 'Delete'}</CommonText>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    tagContainer: {
        borderRadius: 30,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderColor: 'red',
    },
});
