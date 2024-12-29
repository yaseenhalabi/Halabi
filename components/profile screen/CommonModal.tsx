import { View, Modal, StyleSheet, TouchableWithoutFeedback, Dimensions, KeyboardAvoidingView } from 'react-native';
import getTheme from '../../utils/GetTheme';
import { BlurView } from 'expo-blur';
type CommonModalProps = {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    heightProportion?: number;
    contentContainerStyle?: any;
};

const screenHeight = Dimensions.get('window').height;

export default function CommonModal({ isVisible, onClose, children, heightProportion, contentContainerStyle }: CommonModalProps) {
    const theme = getTheme();
    const heightToPercent = heightProportion ? screenHeight * heightProportion : screenHeight * 0.5;
    const topToPercent = heightProportion ? screenHeight * (0.4 - heightProportion / 2) : screenHeight * 0.25;

    return (
        <Modal visible={isVisible} transparent animationType="none">
            <TouchableWithoutFeedback onPress={onClose} style={styles.backgroundTouchable}>
                <BlurView style={styles.modalOverlay} intensity={5}/>
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior='height' style={[styles.modalContent, contentContainerStyle || {}, { height: heightToPercent, top: topToPercent, backgroundColor: theme.backgroundSecondary, borderColor: theme.button}]}>
                {children}
            </KeyboardAvoidingView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundTouchable: {
        position: 'absolute',
        flex: 1,
        width: '100%',
    },
    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        width: '100%',
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '10%',
        width: '80%',
        borderWidth: 5,
        padding: 10,
        borderRadius: 15,
    }
});