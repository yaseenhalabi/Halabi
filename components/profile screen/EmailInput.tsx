import ProfileInputContainer from "./ProfileInputContainer";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import getTheme from "../../utils/GetTheme";
import CommonModal from "./CommonModal";
import CommonText from "../CommonText";
import { useEffect, useRef, useState } from "react";
import SaveButton from "./SaveButton";
type EmailInputProps = {
    value: string;
    onChangeText: (text: string) => void;
}
        
export default function EmailInput({ value, onChangeText }: EmailInputProps) {
    const theme = getTheme();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setEmail(value);
        setIsModalVisible(true)
    }
    const hideModal = () => {
        setIsModalVisible(false);
    }
    const [email, setEmail] = useState("");



    return (
        <>
            <CommonModal isVisible={isModalVisible} onClose={hideModal} heightProportion={0.12} contentContainerStyle={styles.modalContentContainer}>
                <TextInput 
                    value={email}
                    style={styles.input} 
                    onChangeText={setEmail} 
                    placeholder='john.doe@gmail.com'
                    placeholderTextColor={theme.text.muted}
                    autoCapitalize='none'
                    autoCorrect={false}
                    inputMode="email"
                    autoFocus={email === ''}
                    selectTextOnFocus
                    keyboardAppearance="dark"

                />
                <SaveButton onPress={() => {
                    onChangeText(email);
                    hideModal();
                }}/>
            </CommonModal>
            <ProfileInputContainer title="Email" onClick={showModal}>
                    {
                        value ? 
                        <CommonText size='small'>{value}</CommonText>
                        :
                        <CommonText size='small' color='muted'>Enter Email</CommonText>
                    }
            </ProfileInputContainer>
        </>
    )
}


const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        paddingVertical: 5,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        width: '100%',
        overflow: 'hidden',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    modalContentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})