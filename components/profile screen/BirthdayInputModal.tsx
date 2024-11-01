import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, Modal } from "react-native";
import { Birthday } from "../../utils/types";
import getTheme from "../../utils/GetTheme";
import { useState, useRef, useEffect } from "react";
import CommonText from "../CommonText";
import { isValidDate } from "../../utils/helpers";
import cancelIcon from "../../assets/images/cancel-icon-white.png";
import CommonModal from "./CommonModal";

type BirthdayInputModalProps = {
    birthday: Birthday;
    onChangeBirthday: (newBirthday: Birthday) => void;
    handleClose: () => void;
};

export default function BirthdayInputModal({ birthday, onChangeBirthday, handleClose }: BirthdayInputModalProps) {
    const theme = getTheme();
    const dayInputRef = useRef<TextInput>(null); // Reference for the day input
    const monthInputRef = useRef<TextInput>(null); // Reference for the month input
    const [birthdayState, setBirthdayState] = useState<Birthday>({ month: birthday.month, day: birthday.day });
    const [isInvalidInput, setIsInvalidInput] = useState(false);

    useEffect(() => {
        if (isValidDate(birthdayState.month, birthdayState.day)) {
            setIsInvalidInput(false);
        }
        else {
            setIsInvalidInput(true);
        }
    }, [birthdayState]);

    useEffect(() => {
        monthInputRef.current?.focus();
    }, []);

    // Handle changes in the month input
    const handleMonthChange = (text: string) => {
        const cleaned = text.replace(/\D/g, ''); // Remove non-numeric characters
        if (cleaned.length === 2) {
            dayInputRef.current?.focus(); // Automatically move to day input after 2 digits
        }
        setBirthdayState(prevState => ({ ...prevState, month: cleaned }));
    };

    // Handle changes in the day input
    const handleDayChange = (text: string) => {
        const cleaned = text.replace(/\D/g, ''); // Remove non-numeric characters
        setBirthdayState(prevState => ({ ...prevState, day: cleaned }));
    };

    // Select all text when input is focused
    const handleSelectAllText = (inputRef: any, length: number) => {
        inputRef.current?.setNativeProps({
            selection: { start: 0, end: length },
        });
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
                    style={[styles.textInput, styles.extraLargeText, styles.centeredText]}
                    value={birthdayState.month}
                    placeholder="mm"
                    placeholderTextColor={theme.text.muted}
                    onChangeText={handleMonthChange}
                    onFocus={() => handleSelectAllText(monthInputRef, birthdayState.month.length)}
                    keyboardType="numeric"
                    maxLength={2}
                    returnKeyType="next"
                />
                <Text style={[styles.slashText, styles.extraLargeText]}>/</Text>
                <TextInput
                    ref={dayInputRef}
                    style={[styles.textInput, styles.extraLargeText, styles.centeredText]}
                    value={birthdayState.day}
                    placeholder="dd"
                    placeholderTextColor={theme.text.muted}
                    onChangeText={handleDayChange}
                    onFocus={() => handleSelectAllText(dayInputRef, birthdayState.day.length)}
                    keyboardType="numeric"
                    maxLength={2}
                    returnKeyType="done"
                />
            </View>
            {
                isInvalidInput ? 
                <CommonText size='medium' color='semi' >Please enter a valid date</CommonText>
                :
                <>
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <CommonText size='medium' color='full'>SAVE</CommonText>
                    </TouchableOpacity>
                </>
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
        color: 'white',
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
    saveButton: {
        width: '80%',
        paddingVertical: 3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center', 
    }
});