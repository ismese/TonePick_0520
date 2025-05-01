import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import SigninScreen from './src/screens/auth/SigninScreen/SigninScreen';
import SignupScreen from './src/screens/auth/SignupScreen/SignupScreen';
import ChangeIdScreen from './src/screens/auth/change_id_screen/ChangeIdScreen';
import ChangePasswordScreen from './src/screens/auth/change_password_screen/ChangePasswordScreen';
import FindIdScreen from './src/screens/auth/find_id_screen/FindIdScreen';
import FindPasswordScreen from './src/screens/auth/find_password_screen/FindPasswordScreen';
import MainPage from './src/screens/main/main_page/MainPage';
import VoicePage from './src/screens/main/voice_page/VoicePage';
import FilePage from './src/screens/main/file_page/FilePage';
import FileDetailPage from './src/screens/file/file_detail_page/FileDetailPage';
import ListPage from './src/screens/profile/list_page/ListPage';
import ProfilePage from './src/screens/profile/profile_page/ProfilePage';
import ImportantVoicePage from './src/screens/voice/important_voice_page/ImportantVoicePage';
import DeletedVoicePage from './src/screens/voice/deleted_voice_page/DeletedVoicePage';
import ImportantFilePage from './src/screens/file/important_file_page/ImportantFilePage';
import DeletedFilePage from './src/screens/file/deleted_file_page/DeletedFilePage';
import TermsScreen from './src/screens/terms/terms_screen/TermsScreen';
import PermissionsScreen from './src/screens/terms/permissions_screen/PermissionsScreen'
import RecordPage from './src/screens/record/RecordPage';
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
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeIdScreen" component={ChangeIdScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindId" component={FindIdScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindPw" component={FindPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="VoicePage" component={VoicePage} options={{ headerShown: false }} />
        <Stack.Screen name="FilePage" component={FilePage} options={{ headerShown: false }} />
        <Stack.Screen name="FileDetailPage" component={FileDetailPage} options={{ headerShown: false }} />
        <Stack.Screen name="ListPage" component={ListPage} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
        <Stack.Screen name="ImportantVoicePage" component={ImportantVoicePage} options={{ headerShown: false }} />
        <Stack.Screen name="DeletedVoicePage" component={DeletedVoicePage} options={{ headerShown: false }} />
        <Stack.Screen name="ImportantFilePage" component={ImportantFilePage} options={{ headerShown: false }} />
        <Stack.Screen name="DeletedFilePage" component={DeletedFilePage} options={{ headerShown: false }} />
        <Stack.Screen name="TermsScreen" component={TermsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecordPage" component={RecordPage} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
