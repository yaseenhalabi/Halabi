import { View, StyleSheet } from 'react-native';
import CommonText from '../CommonText';
import getTheme from '../../utils/GetTheme';
type ProfileInputContainerProps = {
    title: string;
    children: React.ReactNode;
    hideTitle?: boolean;
}

export default function ProfileInputContainer({ title, children, hideTitle }: ProfileInputContainerProps) {
    const theme = getTheme();
    return (
        <View style={styles.container}>
            {!hideTitle && <CommonText size='xsmall' color='semi' weight='regular'>{title}</CommonText>}
            <View style={[styles.inputContainer, { backgroundColor: theme.backgroundSecondary }]}>
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
        paddingHorizontal: 8,
        paddingVertical: 10,
    }
});
