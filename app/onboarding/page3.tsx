import { View, Text, Image, StyleSheet } from 'react-native';
import CommonText from '../../components/CommonText';
import tagContacts from '../../assets/images/tag-contacts.png';
import ContainedImage from '../../components/ContainedImage';
export default function Page2() {
    return (
        <View>
            <CommonText size='large'><CommonText size='large' style='bold'>Tag contacts</CommonText> and remember important qualities</CommonText>
            <View style={{height: '25%'}}/>
            <ContainedImage source={tagContacts} height={300}/>
        </View>
    );
}





