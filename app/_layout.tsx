import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import FontLoader from '../utils/FontLoader';
import ProviderAndPersistor from '../components/ProviderAndPersistor';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Slot } from 'expo-router'
import { useSelector } from 'react-redux';
export default function Root() {
  const loaded = FontLoader();
  if (!loaded) return null;
  return (
    <ProviderAndPersistor>
      <App /> 
    </ProviderAndPersistor>
  );
}

function App() {
  const theme = useSelector((state: any) => state.theme.themes[state.theme.index]);
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.background}}>
      <Slot />
    </SafeAreaProvider>
  );
}
