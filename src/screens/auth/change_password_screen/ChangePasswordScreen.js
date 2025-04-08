// 비번 변경
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './change_password_screen_style';
import BeforeNavigator from '../../../navigations/BeforeNavigator';

const ChangePasswordScreen = () => {
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
        <Text style={styles.title}>비밀번호 변경하기</Text>
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
          <Text style={styles.label}>변경할 비밀번호를 입력하세요.</Text>
          <TextInput
            style={styles.input}
            placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
            placeholderTextColor="#C6C6C6"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>변경하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> 
  );
};

export default ChangePasswordScreen;