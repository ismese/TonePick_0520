import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import styles from "./profile_page_style";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8F9" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>내 정보</Text>
      </View>

      {/* 프로필 카드 */}
      <TouchableOpacity style={styles.profileCard}>
        <View style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>강양</Text>
          <Text style={styles.profileId}>wlsdud1104</Text>
        </View>
        {/* 기존: <Text style={styles.arrow}>›</Text> */}
        <Icon name="chevron-right" size={24} color="#473B3B" />
      </TouchableOpacity>


      {/* 실선 구분 */}
      <View style={styles.divider} />

      {/* 메뉴 리스트 */}
      <View style={styles.menuList}>
        <TouchableOpacity onPress={() => navigation.navigate('ChangeIdScreen')}>
          <Text style={styles.menuItem}>· 아이디 변경하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <Text style={styles.menuItem}>· 비밀번호 변경하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.menuItem}>· 관리자에게 문의하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.menuItem}>· 로그아웃</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.menuItem}>· 탈퇴하기</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 네비게이션 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("MainPage")}>
          <Icon name="home" size={26} color="#A9A9A9" />
          <Text style={styles.navLabel}>홈</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ProfilePage")}>
          <Icon name="person" size={24} color="#473B3B" />
          <Text style={styles.navLabelActive}>내 정보</Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  );
};

export default ProfilePage;
