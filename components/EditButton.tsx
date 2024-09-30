import { TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import CommonText from './CommonText';
type EditButtonProps = {
    source: any;
    text: string;
    onPress: () => void;
}

export default function EditButton({ source, text, onPress }: EditButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={source} style={styles.icon} />
            <CommonText weight='light' size='xsmall'>{text}</CommonText> 
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    icon: {
        width: 21,
        height: 21,
    }
});