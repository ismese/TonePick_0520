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
import { styles } from './change_password_screen_style';
import BeforeNavigator from '../../../navigations/BeforeNavigator';
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handlePasswordChange = async () => {
    // 생략: 기존 handlePasswordChange 그대로 유지
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ position: 'relative', top: 50, left: 10, zIndex: 10 }}>
        <BeforeNavigator onPress={() => navigation.goBack()} />
      </View>

      <View
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <View style={[styles.container, { flex: 1, justifyContent: 'flex-start', paddingBottom: 50 }]}>
          <Text style={styles.title}>비밀번호 변경하기</Text>
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
              placeholder="예) sunmoon@ac.kr"
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
            <TouchableOpacity style={styles.submitButton} onPress={handlePasswordChange}>
              <Text style={styles.submitButtonText}>변경하기</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
