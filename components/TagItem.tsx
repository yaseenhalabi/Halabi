import { View, TouchableOpacity, StyleSheet, Image, Platform} from 'react-native';
import { Tag, Contact } from '../utils/types';
import { LinearGradient } from 'expo-linear-gradient';
import getTheme from '../utils/GetTheme';
import personIcon from '../assets/images/person-icon-white.png';
import CommonText from './CommonText';
import { contactsToString } from '../utils/helpers';
type TagItemProps = {
    tag: Tag;
    contactsWithTag: Contact[];
    onPress: () => void;
}

export default function TagItem({ tag, contactsWithTag, onPress }: TagItemProps) {
    const theme = getTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['#000000', '#1D1D1D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <View style={styles.leftContainer}>
                    <CommonText numberOfLines={1}>{tag.name}</CommonText>
                    <CommonText weight='regular' size='xsmall' color='semi'>{contactsToString(contactsWithTag)}</CommonText>
                </View>
                <View style={styles.rightContainer}>
                    <CommonText weight='regular' size='medium' style={Platform.OS === 'android' && {top: 2}}>{contactsWithTag.length}</CommonText>
                    <Image source={personIcon} style={styles.icon} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 10,
    },
    leftContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '90%',
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        opacity: .6,
    },
    icon: {
        height: 12,
        width: 12,
        alignSelf: 'center'
    },
});