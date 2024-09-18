import { Text, StyleSheet } from 'react-native';
import getTheme from '../utils/GetTheme';
type Size = 'xsmall' | 'small' | 'medium' | 'large';
type Style = 'xbold' | 'bold' | 'light' | 'medium' | 'regular' | 'semiBold' | 'thin' | 'xlight';
type Color = 'full' | 'semi' | 'muted';
type CustomTextProps = {
    children: React.ReactNode;
    size?: Size;
    style?: Style;
    color?: Color
};

export default function CommonText({ children, size, style, color} : CustomTextProps) {
    const theme = getTheme();
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
    let fontColor: string = '#ffffff';
    switch (color) {
        case 'full':
            fontColor = theme.text.full;
            break;
        case 'semi':
            fontColor = theme.text.semi;
            break;
        case 'muted':
            fontColor = theme.text.muted;
            break;
        default:
            fontColor = theme.text.full;
            break;
    }
    return <Text style={{...styles.text, fontFamily: fontStyle, fontSize: fontSize, color: fontColor}}>{children}</Text>;
}


const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
})
