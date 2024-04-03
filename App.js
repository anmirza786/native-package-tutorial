// App.js
import React, { useEffect } from 'react';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/reducers/store';
import Authguard from './src/components/Authguard';
import axiosInitialization from './src/config/axiosInterceptor';
import { getCountriesData, getStatesData } from './src/shared/api';

axiosInitialization();

const App = () => {
  useEffect(() => {
    // getStatesData();
    // getCountriesData();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Authguard>
          <Routes />
        </Authguard>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
