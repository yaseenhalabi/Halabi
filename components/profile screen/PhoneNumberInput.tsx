import CommonText from "../CommonText";
import CommonModal from "../profile screen/CommonModal";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import getTheme from "../../utils/GetTheme";
import { useState, useRef, useEffect } from "react";
import { formatPhoneNumber, removeFormatting } from "../../utils/helpers";
import SaveButton from "../profile screen/SaveButton";
import { PhoneNumber } from "../../utils/types";
import ProfileInputContainer from "./ProfileInputContainer";
type PhoneNumberInputProps = {
    phoneNumber: PhoneNumber;
    onChangePhoneNumber: (phoneNumber: PhoneNumber) => void;
}
export default function PhoneNumberInput({phoneNumber, onChangePhoneNumber}: PhoneNumberInputProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const theme = getTheme();
    const [countryCode, setCountryCode] = useState('1');
    const [number, setNumber] = useState('');
    const openModal = () => {
        setCountryCode(phoneNumber.countryCode);
        setNumber(formatPhoneNumber(phoneNumber.number));
        setIsModalVisible(true);
    }
    const closeModal = () => {
        setIsModalVisible(false);
    }
    const handleSave = () => {
        onChangePhoneNumber({id: phoneNumber.id, countryCode, number});
        setIsModalVisible(false);
    }
    return (
        <>
        <CommonModal isVisible={isModalVisible} onClose={closeModal} heightProportion={0.12} contentContainerStyle={{gap: 10}}>
            <View style={styles.inputContainer}>
                <CommonText size='medium'>+</CommonText>
                <TextInput 
                    value={countryCode}
                    selectTextOnFocus
                    onChangeText={setCountryCode}
                    style={styles.countryCodeInput} 
                    placeholderTextColor={theme.text.muted} 
                    placeholder='1'
                    keyboardAppearance="dark"
                />
                <TextInput 
                    keyboardType="phone-pad"
                    autoFocus={phoneNumber.number === ''}
                    selectTextOnFocus
                    value={number}  
                    onChangeText={(text) => setNumber(formatPhoneNumber(text))}
                    style={styles.numberInput} 
                    placeholderTextColor={theme.text.muted} 
                    placeholder='___-___-____'
                    keyboardAppearance="dark"
                />
            </View>
            <SaveButton onPress={handleSave} />
        </CommonModal>
        <ProfileInputContainer title="Phone">
            <TouchableOpacity onPress={openModal} hitSlop={20}>
                {phoneNumber.number === '' ?
                    <CommonText size='small' color='muted'>Add phone number</CommonText> :
                    <CommonText size='small'>
                        <CommonText size='small' color='semi'>+{phoneNumber.countryCode} </CommonText>
                        {formatPhoneNumber(phoneNumber.number)}
                    </CommonText>
                }
            </TouchableOpacity>
        </ProfileInputContainer>
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    countryCodeInput: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        width: '10%',
        borderColor: 'transparent',
        borderBottomColor: 'gray',
        borderWidth: 1,
        marginRight: 5
    },
    numberInput: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        width: '80%',
        borderColor: 'transparent',
        borderBottomColor: 'gray',
        borderWidth: 1,
    }
});