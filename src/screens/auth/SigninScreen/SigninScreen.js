import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './signin_screen_style';
import {
  FIREBASE_API_KEY,
  FIREBASE_WEB_CLIENT_ID,
} from '../../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 추가

//  Google 로그인 관련 import (미완성성)
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const SigninScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: FIREBASE_WEB_CLIENT_ID,
    androidClientId: FIREBASE_WEB_CLIENT_ID,
    iosClientId: FIREBASE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      Alert.alert('구글 로그인 성공', 'accessToken: ' + authentication.accessToken);
      navigation.navigate('MainPage');
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('입력 오류', '아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const result = await response.json();

      if (result.error) {
        Alert.alert('로그인 실패', result.error.message);
      } else {
        // 로그인 성공 시 정보 저장 (Firestore 및 탈퇴용)
        await AsyncStorage.setItem('userUid', result.localId);   //  Firestore 문서 조회용
        await AsyncStorage.setItem('userEmail', email);          //  Firebase Auth 삭제용
        await AsyncStorage.setItem('userPw', password);          //  Firebase Auth 삭제용

        //Alert.alert('로그인 성공', '메인 페이지로 이동합니다.'); 로그인 성공 알림 메세지지
        navigation.navigate('MainPage');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      Alert.alert('오류 발생', '네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.logo}>TOnePick</Text>

        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#A6A6A6"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { marginTop: 15 }]}
          placeholder="비밀번호"
          placeholderTextColor="#A6A6A6"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
            <Text style={styles.linkText}>ID 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.divider}>|</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FindPw')}>
            <Text style={styles.linkText}>PW 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.divider}>|</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.socialLoginText}>소셜 로그인</Text>

        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Image
              style={styles.socialIcon}
              source={require('../../../../assets/naver.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => promptAsync()} disabled={!request}>
            <Image
              style={styles.socialIcon}
              source={require('../../../../assets/google.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.socialIcon}
              source={require('../../../../assets/kakao.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SigninScreen;
