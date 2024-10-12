import { useRef, useEffect } from 'react';
import ProfileInputContainer from "./ProfileInputContainer";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import getTheme from "../../utils/GetTheme";
import google_key from "../../secret_key";
type AddressInputProps = {
    initialValue: string;
    onChangeText: (text: string) => void;
}

export default function AddressInput({ initialValue, onChangeText }: AddressInputProps) {
    const theme = getTheme();
    const inputRef: any = useRef();
    useEffect(() => {
        inputRef.current?.setAddressText(initialValue);
    }, []);
    return (
        <ProfileInputContainer title="Address" style={{paddingVertical: 0, paddingHorizontal: 0}}>
            <GooglePlacesAutocomplete
                ref={inputRef}
                placeholder='Search'
                query={{
                    key: google_key,
                    language: 'en',
                }}
                onPress={(data) => {
                    onChangeText(data.description);
                }}
                enablePoweredByContainer={false}
                textInputProps={{
                    defaultValue: initialValue,
                    placeholder: 'Enter Address',
                    placeholderTextColor: theme.text.muted,
                }}
                styles={{
                    textInputContainer: {
                        height: 44,
                    },
                    textInput: {
                        backgroundColor: theme.backgroundSecondary,
                        fontSize: 13,
                        overflow: 'hidden',
                        width: '100%',
                        color: 'white',
                        fontFamily: 'Poppins-Regular',
                    },
                    row: {
                        backgroundColor: theme.backgroundSecondary,
                    },
                    listView: {
                        position: 'absolute',
                        top: 40,
                    },
                    description: {
                        color: theme.text.semi,
                    }
                }}
                disableScroll
            />
        </ProfileInputContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        width: '100%',
        overflow: 'hidden',
    }
})
