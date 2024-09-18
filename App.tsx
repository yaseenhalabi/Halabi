import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CustomText from './components/CustomText';
import FontLoader from './utils/FontLoader';
import ProviderAndPersistor from './redux/ProviderAndPersistor';
import { useEffect } from 'react';
import Onboarding from './components/Onboarding';
export default function App() {
  const loaded = FontLoader();
  if (!loaded) return null;
  
  const firstLaunch = true;

  return (
    <ProviderAndPersistor>
      <View style={styles.container}>
        {
          firstLaunch ? 
          <Onboarding />
          :
          <CustomText size='large' style='bold'>Hello, world!</CustomText>
        }
      </View>
    </ProviderAndPersistor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
