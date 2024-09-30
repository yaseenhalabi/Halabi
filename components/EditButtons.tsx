import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import EditButton from './EditButton';
import { LinearGradient } from 'expo-linear-gradient';
type EditButtonsProps = {
    editButton1: ReactNode;
    editButton2: ReactNode;
    editButton3: ReactNode;
}

export default function EditButtons({ editButton1, editButton2, editButton3 }: EditButtonsProps) {
    return (
        <LinearGradient colors={['#000000', '#1D1D1D']} start={{ x: -1.3, y: -1 }}end={{ x: 2, y: 2 }}  style={styles.container}>
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
        height: 48,
    },
});