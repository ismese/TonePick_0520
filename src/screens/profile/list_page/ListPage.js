import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./list_page_style";
import BeforeNavigator from "../../../navigations/BeforeNavigator"; 
import { useNavigation } from "@react-navigation/native";

const ListPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safearea}> {/* ✅ SafeAreaView 적용 */}
      <View style={styles.screen}>
        {/* 상단 바 */}
        <View style={styles.frame2}>
          <BeforeNavigator onPress={() => navigation.goBack()} />
          <View style={{ flex: 1, alignItems: 'center', marginRight: 30, }}>
            <Text style={styles.title}>목록</Text>
          </View>
        </View>

        {/* 보드 영역 */}
        <View style={styles.frame3}>
          <Text style={styles.sectionTitle}>보드</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FilePage')}>
            <Text style={styles.button}>·  전체 보드</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ImportantFilePage')}>
            <Text style={styles.button}>·  중요 보드</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DeletedFilePage')}>
            <Text style={styles.button}>·  휴지통</Text>
          </TouchableOpacity>
        </View>

        {/* 녹음 영역 */}
        <View style={styles.frame3}>
          <Text style={styles.sectionTitle}>녹음</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VoicePage')}>
            <Text style={styles.button}>·  전체 녹음</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ImportantVoicePage')}>
            <Text style={styles.button}>·  중요 녹음</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DeletedVoicePage')}>
            <Text style={styles.button}>·  휴지통</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 프로젝트 정보 */}
        <View style={styles.footer}>
          <Text style={styles.teamProject}>
            Team Project. TOnePick {"\n"} Figma
          </Text>
          <Text style={styles.footerText}>
            © 우노. 김세은, 김진영, 박준우, 안성수
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListPage;
