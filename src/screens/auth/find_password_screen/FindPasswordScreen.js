// FindPasswordScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from './find_password_screen_style';
import BeforeNavigator from '../../../navigations/BeforeNavigator';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_API_KEY } from '../../../firebase/firebaseConfig';

const FindPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSendResetEmail = async () => {
    if (!email || !name || !phone) {
      Alert.alert('입력 오류', '이메일, 이름, 휴대폰 번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/users?pageSize=100`
      );
      const data = await response.json();

      if (!data.documents) {
        Alert.alert('오류', '사용자 정보를 불러올 수 없습니다.');
        return;
      }

      const matchedUser = data.documents.find((doc) => {
        const fields = doc.fields;
        return (
          fields.email?.stringValue === email &&
          fields.name?.stringValue === name &&
          fields.phone?.stringValue === phone
        );
      });

      if (!matchedUser) {
        Alert.alert('일치하는 사용자 없음', '입력한 정보와 일치하는 계정이 없습니다.');
        return;
      }

      const sendRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          }),
        }
      );

      const result = await sendRes.json();

      if (result.error) {
        Alert.alert('전송 실패', result.error.message);
      } else {
        Alert.alert('이메일 전송 완료', '비밀번호 재설정 이메일이 전송되었습니다.');
        navigation.goBack();
      }
    } catch (error) {
      console.error('비밀번호 재설정 이메일 전송 실패:', error);
      Alert.alert('오류', '이메일 전송 중 문제가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 10,
          zIndex: 10,
        }}
      >
        <BeforeNavigator onPress={() => navigation.goBack()} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={[styles.container, { flex: 1 }]}>
          <Text style={[styles.title, { marginTop: 10 }]}>비밀번호 찾기</Text>
          <View style={styles.separator} />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="예) 홍길동"
              placeholderTextColor="#C6C6C6"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>이메일 주소</Text>
            <TextInput
              style={styles.input}
              placeholder="예) sunmoon123@sunmoon.kr"
              placeholderTextColor="#C6C6C6"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>휴대폰 번호</Text>
            <TextInput
              style={styles.input}
              placeholder="숫자만 입력"
              placeholderTextColor="#C6C6C6"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={{ marginTop: 30, marginBottom: 220 }}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSendResetEmail}>
              <Text style={styles.submitButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FindPasswordScreen;
