import CommonText from '../../components/CommonText';
import PageContainer from '../../components/PageContainer';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SettingToggle from '../../components/settings screen/SettingToggle';
import getTheme from '../../utils/GetTheme';
import { setTheme } from '../../redux/themeSlice';
import { importContacts } from '../../utils/helpers';
export default function Settings() {
    const dispatch = useDispatch();
    const theme = getTheme();
    return (
        <PageContainer style={styles.container}>

            <SettingToggle 
                toggled={theme.name === 'dark'} 
                title="Dark Mode" 
                onToggle={() => dispatch(setTheme(theme.name === 'dark' ? 'light' : 'dark'))} 
            />
            <SettingToggle 
                toggled={true} 
                title="Import Contacts" 
                onToggle={importContacts} 
            />
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        height: '100%',
    }
});