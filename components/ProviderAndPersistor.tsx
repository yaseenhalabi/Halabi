// import { store, persistor } from './store';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
type ProviderAndPersistorProps = {
    children: React.ReactNode;
};
export default function ProviderAndPersistor({ children } : ProviderAndPersistorProps) {
    // Uncomment if needed
    // useEffect(() => {
    //     persistor.purge();
    // }, []);
    return (
        // <Provider store={store}>
        //     <PersistGate loading={null} persistor={persistor}>
        //         {children}    
        //     </PersistGate>
        // </Provider>
        <Provider store={store}>
            {children}
        </Provider>
    );
}