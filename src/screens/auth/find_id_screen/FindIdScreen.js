// 아이디 찾기
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { styles } from './find_id_screen_style';
import BeforeNavigator from '../../../navigations/BeforeNavigator';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_API_KEY } from '../../../firebase/firebaseConfig'; // ✅ Firebase REST API 키 import

const FindIdScreen = () => {
  const navigation = useNavigation();

  // 입력 상태값
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // 사용자 이메일(아이디) 찾기
  const handleFindId = async () => {
    if (!email || !phone) {
      Alert.alert('입력 오류', '이메일과 전화번호를 모두 입력하세요.');
      return;
    }

    try {
      // ✅ Authorization 헤더 제거하고 API 키를 쿼리스트링으로 전달
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/users?pageSize=100&key=${FIREBASE_API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!data.documents) {
        Alert.alert('오류', '사용자 정보를 가져올 수 없습니다.');
        return;
      }

      const matchedUser = data.documents.find((doc) => {
        const fields = doc.fields;
        return (
          fields.email?.stringValue === email &&
          fields.phone?.stringValue === phone
        );
      });

      if (matchedUser) {
        Alert.alert('아이디 찾기 성공', `가입된 아이디는: ${matchedUser.fields.userId.stringValue}`);
      } else {
        Alert.alert('찾을 수 없음', '입력하신 정보와 일치하는 아이디가 없습니다.');
      }
    } catch (error) {
      console.error('아이디 찾기 실패:', error);
      Alert.alert('오류 발생', '네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity
        style={{
          position: 'relative',
          top: 50,
          left: 10,
          zIndex: 10,
        }}
      >
        <BeforeNavigator onPress={() => navigation.goBack()} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>아이디 찾기</Text>
        <View style={styles.separator} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이메일 주소를 입력해주세요.</Text>
          <TextInput
            style={styles.input}
            placeholder="예)sunmoon123@sunmoon.kr"
            placeholderTextColor="#C6C6C6"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>휴대폰 번호를 입력해주세요.</Text>
          <TextInput
            style={styles.input}
            placeholder="숫자를 입력해주세요."
            placeholderTextColor="#C6C6C6"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleFindId}>
          <Text style={styles.submitButtonText}>찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FindIdScreen;
