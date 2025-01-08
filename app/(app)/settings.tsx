import CommonText from '../../components/CommonText';
import PageContainer from '../../components/PageContainer';
import { Alert, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SettingToggle from '../../components/settings screen/SettingToggle';
import getTheme from '../../utils/GetTheme';
import { setTheme } from '../../redux/themeSlice';
import SettingButton from '../../components/settings screen/SettingButton';
import { syncContactsToHalabi, syncContactsToNative } from '../../utils/SyncContactScripts';
import { resetTags } from '../../redux/tagsSlice';
import { resetContacts } from '../../redux/contactsSlice';
export default function Settings() {
    const dispatch = useDispatch();
    const theme = getTheme();
    const contacts = useSelector((state: any) => state.contacts);
    const onSyncContactsToHalabi = async () => {
        return await syncContactsToHalabi(dispatch, contacts);
        
    }
    const onSyncContactsToNative = async () => {
        return await syncContactsToNative(dispatch, contacts);
    }

    const onResetAllData = async (): Promise<boolean> => {
        return new Promise((resolve) => {
            Alert.alert(
                'Reset All Data',
                'Are you sure you want to delete all contacts and tags? This cannot be undone.',
                [
                    { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
                    { 
                        text: 'Reset', 
                        style: 'destructive',
                        onPress: () => {
                            dispatch(resetContacts());
                            dispatch(resetTags());
                            resolve(true);
                        }
                    }
                ],
                { cancelable: true }
            );
        });
    }

    return (
        <PageContainer style={styles.container}>

            <SettingToggle 
                toggled={theme.name === 'dark'} 
                title="Dark Mode" 
                onToggle={() => dispatch(setTheme(theme.name === 'dark' ? 'light' : 'dark'))} 
            />
            <SettingButton 
                title="Sync iPhone Contacts -> Halabi" 
                onPress={async () => await onSyncContactsToHalabi()}
            />
            <SettingButton 
                title="Sync Halabi -> iPhone Contacts" 
                onPress={async () => await onSyncContactsToNative()}
            />
            <SettingButton
                title="Reset All Data"
                color={theme.text.error}
                onPress={async () => await onResetAllData()}
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