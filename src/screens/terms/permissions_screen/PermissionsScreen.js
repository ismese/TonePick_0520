import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { styles } from "./permissions_screen_style";
import { useNavigation } from "@react-navigation/native";
import BeforeNavigator from "../../../navigations/BeforeNavigator"; // 경로 확인

export default function PermissionsScreen() {
  const navigation = useNavigation();
  const [allAgree, setAllAgree] = useState(false);
  const [agreements, setAgreements] = useState([false, false, false, false]);

  const termsList = [
    "서비스 이용약관 (필수)",
    "개인정보 수집 및 이용 동의 (필수)",
    "위치정보 이용약관 동의 (선택)",
    "마케팅 정보 수신 동의 (선택)",
  ];

  const toggleAllAgree = () => {
    const newValue = !allAgree;
    setAllAgree(newValue);
    setAgreements(agreements.map(() => newValue));
  };

  const toggleAgreement = (index) => {
    const newAgreements = [...agreements];
    newAgreements[index] = !agreements[index];
    setAgreements(newAgreements);
    setAllAgree(newAgreements.every((item) => item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <BeforeNavigator onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Text style={styles.title}>이용약관에{'\n'}동의 해주세요.</Text>
          <View style={styles.line} />
        </View>

        {/* 동의 목록 */}
        <View style={styles.agreeBox}>
          {/* 모두 동의 */}
          <TouchableOpacity style={styles.agreeItem} onPress={toggleAllAgree}>
            <Text style={styles.checkbox}>
              {allAgree ? "☑" : "☐"}
            </Text>
            <Text style={styles.agreeText}>모두 동의</Text>
          </TouchableOpacity>

          {/* 개별 항목 */}
          {termsList.map((term, index) => (
            <TouchableOpacity
              key={index}
              style={styles.agreeItem}
              onPress={() => toggleAgreement(index)}
            >
              <Text style={styles.checkbox}>
                {agreements[index] ? "☑" : "☐"}
              </Text>
              <Text style={styles.agreeText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 완료 버튼 */}
        <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={() => navigation.navigate("MainPage")} // ✅ MainPage로 이동
        >
          <Text style={styles.completeButtonText}>완료</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
