import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { styles } from './record_page_style';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import BeforeNavigator from '../../navigations/BeforeNavigator';
import { uploadVoiceClone } from './uploadVoiceClone';


export default function RecordPage() {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(null);
  const [isRecordingModalVisible, setRecordingModalVisible] = useState(false);
  const [recordedUris, setRecordedUris] = useState([]);

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
      setRecordedUris(prev => [...prev, uri]);
      await sendToTTSModel(uri);
      setRecording(null);
      setRecordingModalVisible(false);
    } catch (err) {
      console.error('녹음 중지 실패:', err);
    }
  };

  const sendToTTSModel = async (audioUri) => {
    console.log('📤 TTS 모델에 전송 준비:', audioUri);
    // 필요 시 API 업로드 로직 추가
  };

  const playRecording = async (uri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (err) {
      console.error('재생 실패:', err);
      Alert.alert('재생 오류', '녹음 파일을 재생할 수 없습니다.');
    }
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
            <View style={styles.recordItem} key={index}>
              <Text style={styles.recordText}>녹음 파일 {index + 1}</Text>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => {
                  if (recordedUris[index]) {
                    playRecording(recordedUris[index]);
                  } else {
                    Alert.alert('알림', '녹음된 파일이 없습니다.');
                  }
                }}
              >
                <Text style={styles.playIcon}>▶</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.progressSection}>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>
              {Math.min(100, Math.round((recordedUris.length / 7) * 100))}%
            </Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${(recordedUris.length / 7) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          {recordedUris.length < 7 ? (
            <TouchableOpacity
              style={styles.recordButtonLarge}
              onPress={() => {
                setRecordingModalVisible(true);
                startRecording();
              }}
            >
              <Text style={styles.recordButtonText}>녹음하기</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.recordButtonLarge}
              onPress={() => uploadVoiceClone(recordedUris)}
            >
              <Text style={styles.recordButtonText}>내 목소리 만들기</Text>
            </TouchableOpacity>
          )}
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
