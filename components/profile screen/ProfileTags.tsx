import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Tag } from '../../utils/types';
import CommonText from '../CommonText';
import { getContactById } from '../../utils/helpers';
import { router } from 'expo-router';
import { useState } from 'react';
import getTheme from '../../utils/GetTheme';
import { useDispatch } from 'react-redux';
import { addTagToContact } from '../../redux/contactsSlice';
import cancelIcon from '../../assets/images/cancel-icon-white.png';
import { addTag } from '../../redux/tagsSlice';
import { v4 as uuidv4 } from 'uuid';
import ProfileTag from './ProfileTag';
type ProfileTagsProps = {
    tagIds: string[];
    contactId: string;
}
export default function ProfileTags({ tagIds, contactId }: ProfileTagsProps) {
    const theme = getTheme();
    const allTags = useSelector((state: any) => state.tags)
    const tags = allTags.filter((tag: Tag) => tagIds.includes(tag.id));

    const onTagPress = () => {
        router.push("my-tags");
    }

    const tagComponents = tags.map((tag: Tag) => <ProfileTag key={tag.id} tagId={tag.id} onPress={onTagPress} contactId={contactId} canDelete/>);
    const [addingTag, setAddingTag] = useState(false);
    const [searchText, setSearchText] = useState('');
    const toggleAddingTag = () => {
        setAddingTag(prev => !prev);
    }
    const closeAddingTag = () => {
        setAddingTag(false);
        setSearchText('');
    }
    return (
        <View style={styles.container}>
            {tagComponents}
            {
                addingTag ? 
                <View style={[styles.addTagContainer, { borderColor: theme.button }]}>
                    <TouchableOpacity hitSlop={5} onPress={closeAddingTag}>
                        <Image source={cancelIcon} style={styles.cancelIcon} />
                    </TouchableOpacity>
                    <TextInput 
                        value={searchText} 
                        onChangeText={setSearchText} 
                        placeholder="Search for a tag"
                        placeholderTextColor={theme.text.muted}
                        autoFocus={true}
                        style={{...styles.input}}
                        returnKeyType='done'
                        keyboardAppearance='dark'
                        autoCapitalize='words'
                    />
                    <ListOfProfileTags 
                        tags={allTags} 
                        searchText={searchText} 
                        contactId={contactId} 
                        closeAddingTag={closeAddingTag}
                        setSearchText={setSearchText}
                    />
                </View>
                :
                <TouchableOpacity hitSlop={20} onPress={toggleAddingTag}>
                    <CommonText weight="regular" size="small">+ Add Tag</CommonText>
                </TouchableOpacity>
            }
        </View>
    );
}


type ListOfProfileTagsProps = {
    tags: Tag[];
    searchText: string;
    contactId: string;
    closeAddingTag: () => void;
    setSearchText: (text: string) => void;
}
function ListOfProfileTags({ tags, searchText, contactId, closeAddingTag, setSearchText }: ListOfProfileTagsProps) {
    const dispatch = useDispatch();
    const contacts = useSelector((state: any) => state.contacts);
    const contact = getContactById(contactId, contacts);
    const tagIds = contact?.tags ||[];
    let filteredTags = tags.filter((tag: Tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()) && !tagIds.includes(tag.id));
    filteredTags = filteredTags.slice(0, 5); 
    const theme = getTheme();
    const addTagToContact_ = (tagId: string) => {
        dispatch(addTagToContact({ contactId: contactId, tagId: tagId }));
        setSearchText('');
    }
    const createNewTag = () => {
        const newTag = { id: uuidv4(), name: searchText };
        dispatch(addTag(newTag));
        addTagToContact_(newTag.id);
    }
    return (
        <View style={{width: '100%', position: 'relative'}}>
            <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} style={{paddingVertical: 5}}>
                {
                    searchText.length > 0 &&
                    <TouchableOpacity hitSlop={10} onPress={createNewTag}>
                        <CommonText weight="regular" size="small">+ New tag "{searchText}"</CommonText>
                    </TouchableOpacity>
                }
                {filteredTags.map((tag: Tag) => (
                    <ProfileTag 
                        key={tag.id} 
                        tagId={tag.id} 
                        onPress={() => addTagToContact_(tag.id)} 
                        contactId={contactId} 
                        canDelete={false}
                    />
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        gap: 8,
    },
    input: {
        width: '100%',
        color: 'white',
        paddingVertical: 5,

    },
    addTagContainer: {
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    cancelIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: -25,
        top: -10
    }
});