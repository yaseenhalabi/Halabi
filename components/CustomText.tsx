import { Text, StyleSheet } from 'react-native';

type Size = 'xsmall' | 'small' | 'medium' | 'large';
type Style = 'xbold' | 'bold' | 'light' | 'medium' | 'regular' | 'semiBold' | 'thin' | 'xlight';
type CustomTextProps = {
    children: React.ReactNode;
    size?: Size;
    style?: Font;
};

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
})
export default function CustomText({ children, size, style } : CustomTextProps) {
    let fontSize: number = 14;
    switch (size) {
        case 'xsmall':
            fontSize = 8;
            break;
        case 'small':
            fontSize = 11;
            break;
        case 'medium':
            fontSize = 14;
            break;
        case 'large':
            fontSize = 20;
            break;
        default:
            fontSize = 14;
            break;
    }
    let fontStyle: string = 'Poppins-Regular';
    switch (style) {
        case 'xbold':
            fontStyle = 'Poppins-Black';
            break;
        case 'bold':
            fontStyle = 'Poppins-Bold';
            break;
        case 'light':
            fontStyle = 'Poppins-Light';
            break;
        case 'medium':
            fontStyle = 'Poppins-Medium';
            break;
        case 'regular':
            fontStyle = 'Poppins-Regular';
            break;
        case 'semiBold':
            fontStyle = 'Poppins-SemiBold';
            break;
        case 'thin':
            fontStyle = 'Poppins-Thin';
            break;
        case 'xlight':
            fontStyle = 'Poppins-ExtraLight';
            break;
        default:
            fontStyle = 'Poppins-Regular';
            break;
    }
    return <Text style={{...styles.text, fontFamily: fontStyle, fontSize: fontSize}}>{children}</Text>;
}


