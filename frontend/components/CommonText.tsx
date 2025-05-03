import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import getTheme from '../utils/GetTheme';

type Size = 'xsmall' | 'small' | 'medium' | 'large';
type Weight = 'xbold' | 'bold' | 'light' | 'medium' | 'regular' | 'semiBold' | 'thin' | 'xlight';
type Color = 'full' | 'semi-full' | 'semi' | 'muted';

type CustomTextProps = {
    children: React.ReactNode;
    numberOfLines?: number;
    size?: Size;
    weight?: Weight;
    color?: Color;
    style?: StyleProp<TextStyle>; // Accepts a style prop for customization
};

export default function CommonText({ children, size = 'medium', weight = 'regular', color = 'full', style, numberOfLines }: CustomTextProps) {
    const theme = getTheme();

    // Set font size based on the size prop
    let fontSize: number;
    switch (size) {
        case 'xsmall':
            fontSize = 11;
            break;
        case 'small':
            fontSize = 14;
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

    // Set font style based on the weight prop
    let fontStyle: string;
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

    // Set font color based on the color prop
    let fontColor: string;
    switch (color) {
        case 'semi':
            fontColor = theme.text.semi;
            break;
        case 'muted':
            fontColor = theme.text.muted;
            break;
        case 'semi-full':
            fontColor = theme.text.semiFull;
            break;
        default:
            fontColor = theme.text.full;
            break;
    }

    // Use StyleSheet.flatten to merge styles
    return (
        <Text 
            numberOfLines={numberOfLines}
            style={StyleSheet.flatten([
                { 
                    fontFamily: fontStyle, 
                    fontSize: fontSize, 
                    color: fontColor, 
                },
                style // Apply the passed-in style last, so it can override defaults
            ])}
        >
            {children}
        </Text>
    );
}