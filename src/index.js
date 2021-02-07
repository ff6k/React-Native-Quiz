import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './assets/theme';
import { setAlertRef } from './components/Alert';
import Loading from './components/Loading';
import store, { persistor } from './containers/store';
import AppRoute from './screens';

export default function Main() {
  const ddref = useRef(null);
  const { colors } = useTheme();
  setAlertRef(ddref);
  const indicator = { justifyContent: 'center', alignItems: 'center', flex: 1 };
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <AppRoute />
        </PaperProvider>
        {/*fix-ios bug: can not show. So Make sure put DropdownAlert after all components */}
        <DropdownAlert
          ref={ddref}
          successColor={colors.primary}
          errorColor={colors.error}
        />
      </PersistGate>
    </StoreProvider>
  );
}
