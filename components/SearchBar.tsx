import { View, TextInput, ScrollView, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import searchIcon from '../assets/images/search-icon-white.png';
import xIcon from '../assets/images/x-icon-white.png';
import GetTheme from '../utils/GetTheme';
import { useState, useRef } from 'react';
type SearchBarProps = {
    onChangeText: (text: string) => void;
    value: string;
}

export default function SearchBar({ onChangeText, value }: SearchBarProps) {
    const theme = GetTheme();
    const inputRef = useRef<TextInput | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const clearInput = () => {
        inputRef.current?.clear();
        onChangeText('');
        inputRef.current?.blur();
    }
    const hasText = value.length > 0;
    return (
        <View style={styles.container}>
            <LinearGradient 
            colors={['#1D142A', '#2F1B1E']}
            end={{ x: 1, y: 0 }}
            style={styles.insideContainer}
        >
            <Image 
                source={searchIcon}
                style={styles.icon}
            />
            <TextInput
                style={[styles.input, Platform.OS === 'android' ? styles.androidInput : null]}
                placeholder="Search"
                placeholderTextColor={theme.text.semi}
                onChangeText={onChangeText}
                keyboardAppearance='dark'
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <CancelSearch clearInput={clearInput} isFocused={isFocused} hasText={hasText} />
            </LinearGradient>
        </View>
    );
}
type CancelSearchProps = {
    clearInput: () => void;
    isFocused: boolean;
    hasText: boolean;
}

function CancelSearch({ clearInput, isFocused, hasText }: CancelSearchProps) {
    if (!isFocused || !hasText) return null;
    return (
        <TouchableOpacity onPress={clearInput} hitSlop={25}>
            <Image
                source={xIcon}
                style={{...styles.icon, opacity: 0.55}}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 35,
    },
    insideContainer: {
        width: '100%',
        alignItems: 'center',
        height: 35,
        paddingHorizontal: 10,
        borderRadius: 40,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        height: 40,
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        paddingVertical: 0,
        lineHeight: 20,
    },
    androidInput: {
        textAlignVertical: 'center',
    },
    icon: {
        width: 15,
        height: 15,
        opacity: 0.77,
        marginRight: 10,
    },
});