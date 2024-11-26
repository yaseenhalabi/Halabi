import { View, Text, Image, StyleSheet } from 'react-native';
import CommonText from '../../components/CommonText';
import valuableInformation from '../../assets/images/valuable-info.png';
import ContainedImage from '../../components/ContainedImage';
export default function Page2() {
    return (
        <View>
            <CommonText size='large'><CommonText size='large' weight='bold'>Store valuable information</CommonText> that you might forget</CommonText>
            <View style={{height: '25%'}}/>
            <ContainedImage source={valuableInformation} height={300}/>
        </View>
    );
}





