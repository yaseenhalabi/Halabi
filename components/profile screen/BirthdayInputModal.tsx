import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, Modal } from "react-native";
import { Birthday } from "../../utils/types";
import getTheme from "../../utils/GetTheme";
import { useState, useRef, useEffect } from "react";
import CommonText from "../CommonText";
import { isValidDate } from "../../utils/helpers";
import cancelIcon from "../../assets/images/cancel-icon-white.png";
import CommonModal from "./CommonModal";
import SaveButton from "./SaveButton";
type BirthdayInputModalProps = {
    birthday: Birthday;
    onChangeBirthday: (newBirthday: Birthday) => void;
    handleClose: () => void;
};

export default function BirthdayInputModal({ birthday, onChangeBirthday, handleClose }: BirthdayInputModalProps) {
    const theme = getTheme();
    const [birthdayState, setBirthdayState] = useState<Birthday>({ month: birthday.month, day: birthday.day });
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const monthInputRef = useRef<any>(null);
    const dayInputRef = useRef<any>(null);
    useEffect(() => {
        if (isValidDate(birthdayState.month, birthdayState.day)) {
            setIsInvalidInput(false);
        }
        else {
            setIsInvalidInput(true);
        }
    }, [birthdayState]);

    // Handle changes in the month input
    const handleMonthChange = (text: string) => {
        const cleaned = text.replace(/\D/g, ''); // Remove non-numeric characters
        setBirthdayState(prevState => ({ ...prevState, month: cleaned }));
        if (cleaned.length === 2) {
            dayInputRef.current.focus();
        }
    };

    // Handle changes in the day input
    const handleDayChange = (text: string) => {
        const cleaned = text.replace(/\D/g, ''); // Remove non-numeric characters
        setBirthdayState(prevState => ({ ...prevState, day: cleaned }));
    };

    const handleSave = () => {
        if (isValidDate(birthdayState.month, birthdayState.day)) {
            setIsInvalidInput(false);
            onChangeBirthday(birthdayState);
            handleClose();
        }
        else {
            setIsInvalidInput(true);
        }
    }
    return (
        <CommonModal isVisible={true} onClose={handleClose} heightProportion={0.15}>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    ref={monthInputRef}
                    style={[styles.textInput, styles.extraLargeText, styles.centeredText, { color: theme.text.full }]}
                    value={birthdayState.month}
                    placeholder="mm"
                    placeholderTextColor={theme.text.semi}
                    onChangeText={handleMonthChange}
                    keyboardType="numeric"
                    maxLength={2}
                    returnKeyType="next"
                    autoFocus={birthdayState.month === ''}
                    selectTextOnFocus
                    keyboardAppearance='dark'
                />
                <Text style={[styles.slashText, styles.extraLargeText, { color: theme.text.semi }]}>/</Text>
                <TextInput
                    ref={dayInputRef}
                    style={[styles.textInput, styles.extraLargeText, styles.centeredText, { color: theme.text.full }]}
                    value={birthdayState.day}
                    placeholder="dd"
                    selectTextOnFocus
                    placeholderTextColor={theme.text.semi}
                    onChangeText={handleDayChange}
                    keyboardType="numeric"
                    maxLength={2}
                    returnKeyType="done"
                    keyboardAppearance='dark'
                />
            </View>
            {
                isInvalidInput ? 
                <CommonText size='medium' color='semi' >Please enter a valid date</CommonText>
                :
                <SaveButton onPress={handleSave} />
            } 
        </CommonModal>
        );
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        padding: 20,
    },
    container: {
        width: '100%',
        paddingHorizontal: 50,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    extraLargeText: {
        fontSize: 35,
        fontFamily: 'Poppins-Medium',
    },
    textInput: {
        height: 40,
        width: 70,
        textAlign: 'center',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: 'center',
    },
    slashText: {
        marginHorizontal: 10, // Space between the inputs
        color: 'white',
    },
    centeredText: {
        textAlign: 'center',
    },
});