import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './signup_screen_style';
import BeforeNavigator from '../../../navigations/BeforeNavigator';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_API_KEY } from '../../../firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const authResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
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

      const result = await authResponse.json();

      if (result.error) {
        Alert.alert('회원가입 실패', result.error.message);
        return;
      }

      await AsyncStorage.setItem('userUid', result.localId);

      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/users?documentId=${result.localId}`;

      await fetch(firestoreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            uid: { stringValue: result.localId },
            name: { stringValue: name },
            userId: { stringValue: id },
            phone: { stringValue: phone },
            email: { stringValue: email },
            createdAt: { timestampValue: new Date().toISOString() },
          },
        }),
      });

      Alert.alert('회원가입 완료', '약관 동의 페이지로 이동합니다.');
      navigation.navigate('TermsScreen');
    } catch (error) {
      console.error('회원가입 요청 실패:', error);
      Alert.alert('오류 발생', '네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView
              scrollEnabled={keyboardVisible} // ✅ 키보드 있을 때만 스크롤 가능
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'relative', top: 50, left: 10, zIndex: 10 }}
              >
                <BeforeNavigator onPress={() => navigation.goBack()} />
              </TouchableOpacity>

              <View style={styles.container}>
                <Text style={styles.title}>회원가입</Text>
                <View style={styles.separator} />

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>이름</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="이름을 입력하세요."
                    placeholderTextColor="#C6C6C6"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>아이디*</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="아이디를 입력하세요."
                    placeholderTextColor="#C6C6C6"
                    value={id}
                    onChangeText={setId}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>비밀번호*</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 입력하세요."
                    secureTextEntry
                    placeholderTextColor="#C6C6C6"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>비밀번호 확인*</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 다시 입력하세요."
                    secureTextEntry
                    placeholderTextColor="#C6C6C6"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>이메일</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="이메일을 입력하세요."
                    placeholderTextColor="#C6C6C6"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>전화번호</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="전화번호를 입력하세요."
                    keyboardType="phone-pad"
                    placeholderTextColor="#C6C6C6"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSignup}>
                  <Text style={styles.submitButtonText}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
