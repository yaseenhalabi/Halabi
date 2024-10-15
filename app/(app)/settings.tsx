import CommonText from '../../components/CommonText';
import PageContainer from '../../components/PageContainer';
import { StyleSheet } from 'react-native';
export default function Settings() {
    return (
        <PageContainer style={styles.container}>
            <CommonText>SETTINGS</CommonText>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        height: '100%',
    }
});