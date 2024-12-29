import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import getTheme from '../utils/GetTheme';
type EditButtonsContainerProps = {
    editButton1: ReactNode;
    editButton2: ReactNode;
    editButton3: ReactNode;
}

export default function EditButtonsContainer({ editButton1, editButton2, editButton3 }: EditButtonsContainerProps) {
    const theme = getTheme();
    const gradientColors: [string, string] = theme.name === "dark" ? ['#000000', '#1D1D1D'] : ['white', '#D9D9D9'] ;

    return (
        <LinearGradient colors={gradientColors} start={{ x: -.2, y: -3 }} end={{ x: 2, y: 2 }} style={styles.container}>
            {editButton1}
            {editButton2}
            {editButton3}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 50,
    },
});