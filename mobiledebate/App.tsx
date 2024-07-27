/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';


import { Provider } from 'react-redux'
import store from './src/redux/store'
import AuthLoading from './src/components/authLoading'
import HttpLoading from './src/components/httpLoading'

import 'react-native-gesture-handler';
import './src/shared/axiosInterceptor'

const App = () => {
 
  return (
    <>

      <Provider store={store}>
        <AuthLoading />
        <HttpLoading />
      </Provider>
    </>
  );
};


export default App



