import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import CommonText from './CommonText';
import * as Haptics from 'expo-haptics';
import getTheme from '../utils/GetTheme';

type EditButtonProps = {
    source: any;
    text: string;
    onPress: () => void;
    badgeCount?: number;
}

export default function EditButton({ source, text, onPress, badgeCount }: EditButtonProps) {
    const theme = getTheme();
    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        onPress();
    }
    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={source} style={styles.icon} />
                {badgeCount !== undefined && badgeCount > 0 && (
                    <View style={[styles.badge, { backgroundColor: theme.text.semiFull }]}>
                        <CommonText weight='medium' size='xsmall' style={[styles.badgeText, { color: theme.background }]}>
                            {badgeCount}
                        </CommonText>
                    </View>
                )}
            </View>
            <CommonText weight='light' size='xsmall'>{text}</CommonText> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    icon: {
        width: 21,
        height: 21,
    },
    iconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        borderRadius: 10,
        minWidth: 17,
        height: 17,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
    },
    badgeText: {
        fontFamily: 'poppins-medium',
    }
});