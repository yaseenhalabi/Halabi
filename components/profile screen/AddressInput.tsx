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
        addressInputRef.current?.focus();
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
                        placeholderTextColor: '#5B5B5B',
                        onChangeText: (text) => {
                            setAddressState(text);
                        },
                    }}
                    enablePoweredByContainer={false}
                    styles={
                        {
                            textInput: {
                                backgroundColor: '#202020',
                                color: 'white',
                                fontSize: 12,
                            },
                            container: { width: '100%', },
                            row: { backgroundColor: '#202020'},
                            separator: { backgroundColor: '#202020', },
                            description: { fontSize: 12, color: 'white' },  
                        }
                    }
                />
                <SaveButton onPress={onSave} />
            </CommonModal>
            <ProfileInputContainer title="Address" onClick={showModal}>
                { address ?
                    <CommonText size='small'>{address}</CommonText>
                    :
                    <CommonText size='small' color='muted'>Add Address</CommonText>
                }
            </ProfileInputContainer>
        </>
    );
}