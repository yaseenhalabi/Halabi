import { View } from 'react-native';
import CommonText from '../../components/CommonText';
import manageGroups from '../../assets/images/manage-groups.png';
import ContainedImage from '../../components/ContainedImage';
export default function Page4() {
    return (
        <View>
            <CommonText style={{color: "white" }} size='large'><CommonText style={{color: "white" }} size='large' weight='bold'>Manage groups</CommonText> of contacts</CommonText>
            <View style={{height: '25%'}}/>
            <ContainedImage source={manageGroups} height={300}/>
        </View>
    );
}





