//로그인 화면
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './signin_screen_style';

const SigninScreen = () => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.logo}>TOnePick</Text>

        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#A6A6A6"
        />
        <TextInput
          style={[styles.input, { marginTop: 15 }]}
          placeholder="비밀번호"
          placeholderTextColor="#A6A6A6"
          secureTextEntry
        />

        <TouchableOpacity onPress={()=>navigation.navigate('MainPage')} style={styles.loginButton}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={()=>navigation.navigate('FindId')}>
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
            <Image style={styles.socialIcon} source={require('../../../../assets/naver.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.socialIcon} source={require('../../../../assets/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.socialIcon} source={require('../../../../assets/kakao.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SigninScreen;
