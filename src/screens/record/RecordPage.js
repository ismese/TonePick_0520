import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar,Modal} from "react-native";
import { styles } from "./record_page_style";
import { useNavigation } from "@react-navigation/native";
import { Audio } from 'expo-av';
import BeforeNavigator from '../../navigations/BeforeNavigator';



export default function RecordPage() {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [isRecordingModalVisible, setRecordingModalVisible] = useState(false);

  const startRecording = async () => {
    try {
      console.log('🔴 녹음 시작');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      console.error('녹음 시작 실패:', err);
    }
  };

  const stopRecording = async () => {
    console.log('⏹️ 녹음 중지');
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('녹음 파일 저장됨:', uri);
      await sendToTTSModel(uri);
      setRecording(null);
      setRecordingModalVisible(false);
    } catch (err) {
      console.error('녹음 중지 실패:', err);
    }
  };

  const sendToTTSModel = async (audioUri) => {
    console.log('📤 TTS 모델에 전송 준비:', audioUri);
    // 여기에 실제 API 연동 로직 추가 가능
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f7f8f9" barStyle="dark-content" />
      <View style={styles.screen}>
        <View style={styles.header}>
          
          <BeforeNavigator onPress={() => navigation.goBack()} />
          <View style={{ flex: 1, alignItems: 'center', marginRight: 30 }}>
            <Text style={styles.headerText}>RECORDING</Text>
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>음성 녹음</Text>
          <Text style={styles.subTitle}>당신의 목소리를 추가하세요.</Text>
        </View>

        <ScrollView style={styles.recordList} showsVerticalScrollIndicator={false}>
          {Array.from({ length: 7 }, (_, index) => (
            <TouchableOpacity style={styles.recordItem} key={index}>
              <Text style={styles.recordText}>녹음 파일 {index + 1}</Text>
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.progressSection}>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>18%</Text>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.recordButtonLarge}
            onPress={() => {
              setRecordingModalVisible(true);
              startRecording();
            }}
          >
            <Text style={styles.recordButtonText}>녹음하기</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isRecordingModalVisible}
          onRequestClose={() => setRecordingModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>음성 녹음</Text>
              <Text style={styles.modalSubtitle}>하단의 텍스트를 읽어주세요.</Text>
              <Text style={styles.modalText}>
                복용을 중단하면 대부분 다시 원래 상태로 돌아간다.
              </Text>

              <View style={styles.waveform}>
                <Text style={{ color: 'red' }}>🎙️ 실제 파형 시각화 예정</Text>
              </View>

              <TouchableOpacity
                onPress={recording ? stopRecording : startRecording}
                style={styles.recordButtonLarge}
              >
                <Text style={styles.recordButtonText}>
                  {recording ? '중지하기' : '녹음 시작'}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}