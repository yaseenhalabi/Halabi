import { View, Text, Image, StyleSheet } from 'react-native';
import CommonText from '../../components/CommonText';
import manageGroups from '../../assets/images/manage_groups.png';
import ContainedImage from '../../components/ContainedImage';
export default function Page4() {
    return (
        <View>
            <CommonText size='large'><CommonText size='large' style='bold'>Manage groups</CommonText> of contacts</CommonText>
            <View style={{height: '25%'}}/>
            <ContainedImage source={manageGroups} height={300}/>
        </View>
    );
}





