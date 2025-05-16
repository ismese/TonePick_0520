import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  BackHandler,
} from "react-native";
import styles from "./profile_page_style";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useFocusEffect, CommonActions } from "@react-navigation/native";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_API_KEY } from "../../../firebase/firebaseConfig";

const ProfilePage = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const uid = await AsyncStorage.getItem("userUid");
        if (uid) {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserName(data.name || "");
            setUserId(data.userId || "");
          } else {
            console.log("사용자 정보 없음");
          }
        } else {
          Alert.alert("오류", "로그인 정보가 없습니다.");
        }
      } catch (error) {
        console.error("유저 정보 로드 실패:", error);
        Alert.alert("오류", "사용자 정보를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => backHandler.remove();
    }, [])
  );

  const logoutAndReset = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Signin" }],
      })
    );
  };

  const handleDeleteAccount = async () => {
    Alert.alert("회원 탈퇴", "정말로 탈퇴하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: async () => {
          try {
            const uid = await AsyncStorage.getItem("userUid");
            const email = await AsyncStorage.getItem("userEmail");
            const password = await AsyncStorage.getItem("userPw");

            if (!uid || !email || !password) {
              Alert.alert("오류", "로그인 정보가 없습니다.");
              return;
            }

            const tokenResponse = await fetch(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: email,
                  password: password,
                  returnSecureToken: true,
                }),
              }
            );

            const tokenData = await tokenResponse.json();
            if (tokenData.error) {
              Alert.alert("오류", "인증 토큰 발급에 실패했습니다.");
              return;
            }

            const idToken = tokenData.idToken;
            const deleteAuthRes = await fetch(
              `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${FIREBASE_API_KEY}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
              }
            );

            const deleteAuthJson = await deleteAuthRes.json();
            if (deleteAuthJson.error) {
              Alert.alert("오류", "계정 삭제에 실패했습니다.");
              return;
            }

            await deleteDoc(doc(db, "users", uid));
            await AsyncStorage.clear();

            Alert.alert("탈퇴 완료", "회원 탈퇴가 완료되었습니다.");
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Signin" }],
              })
            );
          } catch (error) {
            Alert.alert("오류", "회원 탈퇴 중 문제가 발생했습니다.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8F9" />
      <View style={styles.header}>
        <Text style={styles.title}>내 정보</Text>
      </View>

      <TouchableOpacity style={styles.profileCard}>
        <View style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileId}>{userId}</Text>
        </View>
        <Text style={styles.arrow}>{'›'}</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.menuList}>
        <TouchableOpacity onPress={() => navigation.navigate("ChangeIdScreen")}>
          <Text style={styles.menuItem}>· 아이디 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChangePasswordScreen")}>
          <Text style={styles.menuItem}>· 비밀번호 변경하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.menuItem}>· 관리자에게 문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logoutAndReset}>
          <Text style={styles.menuItem}>· 로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.menuItem}>· 탈퇴하기</Text>
        </TouchableOpacity>
      </View>

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

      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={25} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePage;
