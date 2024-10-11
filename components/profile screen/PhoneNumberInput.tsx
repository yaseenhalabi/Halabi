import ProfileInputContainer from "./ProfileInputContainer";
import { TextInput, StyleSheet, TouchableOpacity, View, Modal, TouchableWithoutFeedback, FlatList} from "react-native";
import getTheme from "../../utils/GetTheme";
import { formatPhoneNumber } from "../../utils/helpers";
import CommonText from "../CommonText";
import CountryCodes from '../../assets/public data/country-codes.json';
import { useState } from "react";
type PhoneNumberInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    countryCode: string;
    onChangeCountryCode: (countryCode: string) => void;
}

export default function PhoneNumberInput({ value, onChangeText, countryCode, onChangeCountryCode }: PhoneNumberInputProps) {
    const theme = getTheme();
    const handleChange = (text: string) => {
        onChangeText(text);
    };


    return (
        <ProfileInputContainer title="Phone">
            <View style={styles.phoneNumberContainer}>
                <PhoneNumberCountryCodeButton countryCode={countryCode} onChangeCountryCode={onChangeCountryCode}/>
                <TextInput 
                    value={formatPhoneNumber(value)}
                    style={styles.input} 
                    onChangeText={handleChange} 
                    placeholder='Enter phone number'
                    placeholderTextColor={theme.text.muted}
                    keyboardType='phone-pad'
                />
            </View>
        </ProfileInputContainer>
    )
}
type PhoneNumberCountryCodeButtonProps = {
    countryCode: string;
    onChangeCountryCode: (countryCode: string) => void;
}
function PhoneNumberCountryCodeButton({countryCode, onChangeCountryCode}: PhoneNumberCountryCodeButtonProps) {
    const theme = getTheme();
    const [showCountryCodeModal, setShowCountryCodeModal] = useState(false);
    const show = () => {
        setShowCountryCodeModal(true);
    }
    const hide = () => {
        setShowCountryCodeModal(false);
    }
    return (
        <>
            <TouchableOpacity onPress={show} style={{backgroundColor: theme.button, ...styles.countryCodeButton}}>
                <CommonText size='small'>+{countryCode}</CommonText>
            </TouchableOpacity>
            {
                showCountryCodeModal && <PhoneNumberCountryCodeModal onChangeCountryCode={onChangeCountryCode} isVisible={showCountryCodeModal} hide={hide}/>
            }
        </>
    )
}
type PhoneNumberCountryCodeModalProps = {
    isVisible: boolean;
    hide: () => void;
    onChangeCountryCode: (countryCode: string) => void;
}
function PhoneNumberCountryCodeModal({isVisible, hide, onChangeCountryCode}: PhoneNumberCountryCodeModalProps) {
    const theme = getTheme();
    const countryCodePressed = (dial: string) => {
        onChangeCountryCode(dial);
        hide();
    }
    
    return (
        <Modal transparent visible={isVisible}>
            <TouchableWithoutFeedback onPress={hide}>
                <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                    <TouchableWithoutFeedback>
                        <View style={{...styles.modalContainer, backgroundColor: theme.backgroundSecondary, borderColor: theme.button}}>
                            <FlatList
                                data={Object.keys(CountryCodes)}
                                renderItem={({item}) => 
                                    <CountryCodeItem 
                                        dial={(CountryCodes as Record<string, string>)[item]}
                                        name={item}
                                        onPress={() => countryCodePressed((CountryCodes as Record<string, string>)[item])}
                                    />
                                }
                                keyExtractor={item => item}
                                showsVerticalScrollIndicator
                                
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
type CountryCodeItemProps = {
    dial: string;
    name: string;
    onPress: () => void;
}
function CountryCodeItem({ dial, name, onPress }: CountryCodeItemProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.countryCodeItem}>
            <CommonText size='small'>+{dial} - {name}</CommonText>
        </TouchableOpacity>
    )
}   
const styles = StyleSheet.create({
    input: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        width: '100%',
        overflow: 'hidden',
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    countryCodeButton: {
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    modalContainer: {
        height: '40%',
        width: '70%', // Increased width for better visibility
        left: '15%',
        top: '25%',
        borderWidth: 3,
        padding: 10,
    },
    countryCodeItem: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
})