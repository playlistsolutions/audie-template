/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Navigation from './src/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast, {ErrorToast, BaseToast} from 'react-native-toast-message';

import 'react-native-reanimated';

function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  const toastConfig = {
    error: (props: any) => (
      <ErrorToast
        {...props}
        text2Style={{color: 'grey'}}
        style={{borderLeftColor: '#FF3333'}}
      />
    ),
    warning: (props: any) => (
      <BaseToast
        {...props}
        text2Style={{color: 'grey'}}
        style={{borderLeftColor: '#EED202'}}
      />
    ),
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

export default App;
