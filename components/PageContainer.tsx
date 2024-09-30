import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import getTheme from '../utils/GetTheme';
import { Keyboard } from 'react-native';
type PageContainerProps = {
    children: React.ReactNode;
    style?: any;
}

export default function PageContainer({ children, style }: PageContainerProps) {
    const theme = getTheme();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} disabled={Keyboard.isVisible()}>
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
