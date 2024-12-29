import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SymbolView } from 'expo-symbols';
import CommonText from '../CommonText';
import { useSelector, useDispatch } from 'react-redux';
import getTheme from '../../utils/GetTheme';
import { useEffect, useRef } from 'react';
export default function EditTags({ endEditing, trashTags }: { endEditing: () => void, trashTags: () => void }) {
    const numberOfSelectedTags = useSelector((state: any) => state.tagSelection.selectedTags.length);
    const dispatch = useDispatch();
    const theme = getTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[
            styles.container, 
            { backgroundColor: theme.background, opacity: fadeAnim }
        ]}>
            <CommonText size='small' color='full'>Selected {numberOfSelectedTags} tags</CommonText>
            <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={endEditing} hitSlop={10}>
                    <SymbolView name="xmark" size={17} tintColor={theme.text.full} style={styles.symbol} />
                </TouchableOpacity>
                <TouchableOpacity onPress={trashTags} hitSlop={10}>
                    <SymbolView name="trash" size={17} tintColor={theme.text.full} style={styles.symbol} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 10,
        gap: 20
    },
    symbol: {
        width: 30, 
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 