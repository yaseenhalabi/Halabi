import { TouchableOpacity, Image, StyleSheet } from 'react-native';
type HeaderIconProps = {
    size: number;
    source: any;
    onPress: () => void;
}
export default function HeaderIcon({ size, source, onPress }: HeaderIconProps) {
    return (
        <TouchableOpacity onPress={onPress} hitSlop={20}>
            <Image source={source} style={{width: size, height: size}} />
        </TouchableOpacity>
    )
}