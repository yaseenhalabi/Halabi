import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import getTheme from '../utils/GetTheme';
type PageContainerProps = {
    children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
    const theme = getTheme();
    return (
        <SafeAreaView style={{...styles.container, backgroundColor: theme.background}}>
            { children }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

});
