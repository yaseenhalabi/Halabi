import { Image, View, StyleSheet } from 'react-native';

type ContainedImageProps = {
    source: any;
    height: number
    style?: any;
}

export default function ContainedImage({source, height, style}: ContainedImageProps) {
    return (
        <Image source={source} style={{...styles.image, ...style, height: height}}/>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 'auto',
        resizeMode: 'contain',
    }
})