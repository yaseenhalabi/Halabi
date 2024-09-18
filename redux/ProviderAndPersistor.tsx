import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

type ProviderAndPersistorProps = {
    children: React.ReactNode;
};
export default function ProviderAndPersistor({ children } : ProviderAndPersistorProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}    
            </PersistGate>
        </Provider>
    );
}