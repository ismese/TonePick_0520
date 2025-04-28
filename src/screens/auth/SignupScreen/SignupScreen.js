// 회원가입 화면
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { styles } from './signup_screen_style';
import BeforeNavigator from '../../../navigations/BeforeNavigator';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation(); 

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
          <BeforeNavigator 
          onPress={() => navigation.goBack()} // ✅ 이제 오류 없음
        />
        </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
        <View style={styles.separator} />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput style={styles.input} placeholder="이름을 입력하세요." placeholderTextColor="#C6C6C6" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>아이디*</Text>
          <TextInput style={styles.input} placeholder="아이디를 입력하세요." placeholderTextColor="#C6C6C6" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호*</Text>
          <TextInput style={styles.input} placeholder="비밀번호를 입력하세요." secureTextEntry placeholderTextColor="#C6C6C6" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호 확인*</Text>
          <TextInput style={styles.input} placeholder="비밀번호를 다시 입력하세요." secureTextEntry placeholderTextColor="#C6C6C6" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이메일</Text>
          <TextInput style={styles.input} placeholder="이메일을 입력하세요." placeholderTextColor="#C6C6C6" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>전화번호</Text>
          <TextInput style={styles.input} placeholder="전화번호를 입력하세요." keyboardType="phone-pad" placeholderTextColor="#C6C6C6" />
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
