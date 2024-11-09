import ProfileInputContainer from "./ProfileInputContainer";
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Birthday } from "../../utils/types";
import { useState } from "react";
import CommonText from "../CommonText";
import getTheme from "../../utils/GetTheme";
import { getBirthdayText } from "../../utils/helpers";
import BirthdayInputModal from "./BirthdayInputModal";
type BirthdayInputProps = {
    birthday?: Birthday,
    onChangeBirthday: (birthday: Birthday) => void;
}

export default function BirthdayInput({ birthday, onChangeBirthday }: BirthdayInputProps) {
    const theme = getTheme();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const getMonthName = months[parseInt(birthday?.month || '') - 1];
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    return (
        <ProfileInputContainer title="Birthday">
            <TouchableOpacity onPress={openModal}>
                    {birthday?.month != '' && birthday?.day != '' ? (
                        <View style={styles.birthdayContainer}>
                            <CommonText size='small'>{getMonthName} {birthday?.day}</CommonText>
                            <CommonText size='small' color='semi'>{birthday && getBirthdayText(birthday)}</CommonText>
                        </View>
                    ) : (
                        <CommonText size='small' color='muted'>Select Birthday</CommonText>
                    )}
            </TouchableOpacity>
            {
            modalVisible && 
            <BirthdayInputModal 
                birthday={birthday || { month: '', day: '' }}
                onChangeBirthday={onChangeBirthday}
                handleClose={closeModal}
            />
            }
        </ProfileInputContainer>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        width: '100%',
        overflow: 'hidden',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .8)',
    },
    pickerContainer: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    pickerItemStyle: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    birthdayContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 5,
    },
})
