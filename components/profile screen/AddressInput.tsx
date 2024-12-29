import { useRef, useEffect, useState } from 'react';
import ProfileInputContainer from "./ProfileInputContainer";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import getTheme from "../../utils/GetTheme";
import google_key from "../../secret_key";
import CommonModal from './CommonModal';
import CommonText from '../CommonText';
import SaveButton from './SaveButton';

type AddressInputProps = {
    address: string;
    onChangeAddress: (address: string) => void;
}
export default function AddressInput({ address, onChangeAddress }: AddressInputProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const theme = getTheme();
    const showModal = () => {
        setIsModalVisible(true); 
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };
    const addressInputRef = useRef<any>(null);
    const [addressState, setAddressState] = useState(address);
    useEffect(() => {
        addressInputRef.current?.setAddressText(address);
      }, [isModalVisible]);

    const onSave = () => {
        onChangeAddress(addressState);
        hideModal();
    }

    


    return (
        <>
            <CommonModal isVisible={isModalVisible} onClose={hideModal} heightProportion={0.3}>
                <GooglePlacesAutocomplete
                    ref={addressInputRef}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        setAddressState(data.description);
                    }}
                    query={{
                        key: google_key,
                        language: 'en',
                    }}
                    textInputProps={{
                        placeholderTextColor: theme.text.semi,
                        onChangeText: (text) => {
                            setAddressState(text);
                        },
                        keyboardAppearance: 'dark',
                        autoFocus: address === '',
                    }}
                    enablePoweredByContainer={false}
                    styles={
                        {
                            textInput: {
                                backgroundColor: theme.text.backgroundSecondary,
                                color: theme.text.full,
                                fontSize: 12,
                            },
                            container: { width: '100%', },
                            row: { backgroundColor: theme.backgroundSecondary},
                            separator: { backgroundColor: theme.backgroundSecondary, },
                            description: { fontSize: 12, color: theme.text.full },  
                        }
                    }
                />
                <SaveButton onPress={onSave} />
            </CommonModal>
            <ProfileInputContainer title="Address" onClick={showModal}>
                { address ?
                    <CommonText size='small' color='full'>{address}</CommonText>
                    :
                    <CommonText size='small' color='semi'>Add Address</CommonText>
                }
            </ProfileInputContainer>
        </>
    );
}