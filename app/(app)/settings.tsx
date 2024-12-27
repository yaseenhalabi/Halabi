import CommonText from '../../components/CommonText';
import PageContainer from '../../components/PageContainer';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import themeSlice from '../../redux/themeSlice';
import { setTheme } from '../../redux/themeSlice';
export default function Settings() {
    const dispatch = useDispatch();
    return (
        <PageContainer style={styles.container}>
            <TouchableOpacity onPress={() => dispatch(setTheme('dark'))}>
                <CommonText>Dark</CommonText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(setTheme('light'))}>
                <CommonText>Light</CommonText>
            </TouchableOpacity>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        height: '100%',
    }
});