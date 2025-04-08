// 비밀번호 찾기
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './find_password_screen_style';
import BeforeNavigator from '../../../navigations/BeforeNavigator';

const FindPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.screen}> 
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "relative",
            top: 50,
            left: 10,
            zIndex: 10,
          }}
        >
          <BeforeNavigator />
        </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>비밀번호 찾기</Text>
        <View style={styles.separator} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이메일 주소를 입력해주세요.</Text>
          <TextInput
            style={styles.input}
            placeholder="예)sunmoon123@sunmoon.kr"
            placeholderTextColor="#C6C6C6"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>휴대폰 번호를 입력해주세요.</Text>
          <TextInput
            style={styles.input}
            placeholder="숫자를 입력해주세요."
            placeholderTextColor="#C6C6C6"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> 
  );
};

export default FindPasswordScreen;
