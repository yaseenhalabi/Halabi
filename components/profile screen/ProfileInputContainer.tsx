import { View, StyleSheet } from 'react-native';
import CommonText from '../CommonText';
import getTheme from '../../utils/GetTheme';
type ProfileInputContainerProps = {
    title: string;
    children: React.ReactNode;
    hideTitle?: boolean;
    style?: any;
}

export default function ProfileInputContainer({ title, children, hideTitle, style }: ProfileInputContainerProps) {
    const theme = getTheme();
    return (
        <View style={styles.container}>
            {!hideTitle && <CommonText size='xsmall' color='semi' weight='regular'>{title}</CommonText>}
            <View style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }, style]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: '100%',
        gap: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
        minHeight: 45,
    }
});
