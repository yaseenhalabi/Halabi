import CommonText from '../../components/CommonText';
import PageContainer from '../../components/PageContainer';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SettingToggle from '../../components/settings screen/SettingToggle';
import getTheme from '../../utils/GetTheme';
import { setTheme } from '../../redux/themeSlice';
import SettingButton from '../../components/settings screen/SettingButton';
import { syncContactsToHalabi, syncContactsToNative } from '../../utils/SyncContactScripts';
export default function Settings() {
    const dispatch = useDispatch();
    const theme = getTheme();
    const contacts = useSelector((state: any) => state.contacts);
    const onSyncContactsToHalabi = async () => {
        await syncContactsToHalabi(dispatch, contacts);
    }
    const onSyncContactsToNative = async () => {
        await syncContactsToNative(dispatch, contacts);
    }

    return (
        <PageContainer style={styles.container}>

            <SettingToggle 
                toggled={theme.name === 'dark'} 
                title="Dark Mode" 
                onToggle={() => dispatch(setTheme(theme.name === 'dark' ? 'light' : 'dark'))} 
            />
            <SettingButton 
                title="Sync iPhone Contacts to Halabi" 
                onPress={onSyncContactsToHalabi}
            />
            <SettingButton 
                title="Sync Halabi Contacts to iPhone" 
                onPress={onSyncContactsToNative}
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