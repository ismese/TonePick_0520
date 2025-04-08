import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import SigninScreen from './src/screens/auth/SigninScreen/SigninScreen';
import SignupScreen from './src/screens/auth/SignupScreen/SignupScreen';
import ChangeIdScreen from './src/screens/auth/change_id_screen/ChangeIdScreen';
import ChangePasswordScreen from './src/screens/auth/change_password_screen/ChangePasswordScreen'
import FindIdScreen from './src/screens/auth/find_id_screen/FindIdScreen'
import FindPasswordScreen from './src/screens/auth/find_password_screen/FindPasswordScreen'


const Stack = createNativeStackNavigator();

const loadFonts = () => {
  return Font.loadAsync({
    'Pretendard-Regular': require('./assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-Bold': require('./assets/fonts/Pretendard-Bold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChangePw">
        <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeId" component={ChangeIdScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePw" component={ChangePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindId" component={FindIdScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindPw" component={FindPasswordScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
