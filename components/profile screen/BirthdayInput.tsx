import ProfileInputContainer from "./ProfileInputContainer";
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Birthday } from "../../utils/types";
import { useState } from "react";
import CommonText from "../CommonText";
import getTheme from "../../utils/GetTheme";
import { getBirthdayText } from "../../utils/helpers";
type BirthdayInputProps = {
    birthday?: Birthday,
    onChangeBirthday: (birthday: Birthday) => void;
}

export default function BirthdayInput({ birthday, onChangeBirthday }: BirthdayInputProps) {
    const theme = getTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(birthday?.month || '');
    const [selectedDay, setSelectedDay] = useState(birthday?.day || '');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const handleConfirm = () => {
        onChangeBirthday({ month: selectedMonth, day: selectedDay });
        setModalVisible(false);
    };
    return (
        <ProfileInputContainer title="Birthday">
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {birthday ? (
                        <View style={styles.birthdayContainer}>
                            <CommonText size='small'>{birthday.month} {birthday.day}</CommonText>
                            <CommonText size='small' color='semi'>{getBirthdayText(birthday)}</CommonText>
                        </View>
                    ) : (
                        <CommonText size='small' color='muted'>Select Birthday</CommonText>
                    )}
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={{...styles.pickerContainer, backgroundColor: theme.backgroundSecondary}}>
                        <CommonText size='small' color='semi' weight='medium'>Month</CommonText>
                        <Picker
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                            itemStyle={styles.pickerItemStyle}
                        >
                            {months.map((month, index) => ( 
                                <Picker.Item color="white" key={index} label={month} value={month} />
                            ))}
                        </Picker>

                                    <CommonText size='small' color='semi' weight='medium'>Day</CommonText>
                                    <Picker
                                selectedValue={selectedDay}
                            onValueChange={(itemValue) => setSelectedDay(itemValue)}
                            itemStyle={styles.pickerItemStyle}
                        >
                            {days.map((day, index) => (
                                <Picker.Item color="white" key={index} label={day} value={day}/>
                            ))}
                        </Picker>
                        <Button title="Confirm" color={Platform.OS == "android" ? theme.backgroundSecondary : "white"} onPress={handleConfirm} />
                        <Button title="Cancel" color={Platform.OS == "android" ? theme.backgroundSecondary : "white"} onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
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
