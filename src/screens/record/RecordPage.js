import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { styles } from "./record_page_style";

export default function RecordPage() {
  const handlePlay = (index) => {
    console.log(`녹음 파일 ${index + 1} 재생`);
    // 나중에 재생 기능 연결
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f7f8f9" barStyle="dark-content" />
      <View style={styles.screen}>
        
        {/* 상단 제목 */}
        <View style={styles.header}>
          <Text style={styles.headerText}>RECORDING</Text>
        </View>

        {/* 안내 문구 */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>음성 녹음</Text>
          <Text style={styles.subTitle}>당신의 목소리를 추가하세요.</Text>
        </View>

        {/* 녹음 파일 리스트 */}
        <ScrollView style={styles.recordList} showsVerticalScrollIndicator={false}>
          {Array.from({ length: 7 }, (_, index) => (
            <TouchableOpacity style={styles.recordItem} key={index} onPress={() => handlePlay(index)}>
              <Text style={styles.recordText}>녹음 파일 {index + 1}</Text>
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 프로그레스 바 */}
        <View style={styles.progressSection}>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>18%</Text>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
          </View>
        </View>

        {/* 하단 녹음 버튼 */}
        <View style={styles.footer}>
          <View style={styles.recordButtonLarge}>
            <Text style={styles.recordButtonText}>녹음하기</Text>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}
