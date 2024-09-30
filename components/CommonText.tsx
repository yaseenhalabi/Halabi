import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import getTheme from '../utils/GetTheme';
type Size = 'xsmall' | 'small' | 'medium' | 'large';
type Weight = 'xbold' | 'bold' | 'light' | 'medium' | 'regular' | 'semiBold' | 'thin' | 'xlight';
type Color = 'full' | 'semi' | 'muted';
type CustomTextProps = {
    children: React.ReactNode;
    size?: Size;
    weight?: Weight;
    color?: Color
    style?: StyleProp<TextStyle>;
};

export default function CommonText({ children, size, weight, color, style} : CustomTextProps) {
    const theme = getTheme();
    let fontSize: number = 0;
    switch (size) {
        case 'xsmall':
            fontSize = 9;
            break;
        case 'small':
            fontSize = 11;
            break;
        case 'medium':
            fontSize = 16;
            break;
        case 'large':
            fontSize = 20;
            break;
        default:
            fontSize = 16;
            break;
    }
    let fontStyle: string = 'Poppins-Regular';
    switch (weight) {
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
    return (
        <Text 
            style={{
                fontFamily: fontStyle,
                fontSize: fontSize,
                color: fontColor,
                ...style as object
            }}
        >
            {children}
        </Text>
    );
}

