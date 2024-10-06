import { StyleSheet, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import getTheme from '../utils/GetTheme';
import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
type PageContainerProps = {
    children: React.ReactNode;
    scrollEnabled?: boolean;
    style?: any;
}

export default function PageContainer({ children, style, scrollEnabled}: PageContainerProps) {
    const theme = getTheme();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
    });
    Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardVisible(false);
    });
    if (scrollEnabled) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled={!keyboardVisible}>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{...styles.container, ...style}} style={{backgroundColor: theme.background}} >
                    { children }
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} disabled={!keyboardVisible}>
            <View style={{...styles.container, backgroundColor: theme.background, ...style}}>
                { children }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

});
