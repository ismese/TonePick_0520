// RecordPage.js
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
  TextInput,
  KeyboardAvoidingView,
  Platform
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
  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [voiceName, setVoiceName] = useState('');
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
      setRecording(null);
      setRecordingModalVisible(false);
    } catch (err) {
      console.error('녹음 중지 실패:', err);
    }
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

  const recordScripts = [
    '복용을 중단하면 대부분 다시 원래 상태로 돌아가지만, \n일부 경우에는 일정 기간 약물의 효과가 지속되며 신체가 적응하는 시간이 필요합니다.',
    '불면증은 단순한 수면 부족을 넘어 일상생활에 영향을 줄 수 있는 중요한 증상으로, 정확한 원인 분석과 지속적인 관리가 필요합니다.',
    '기억력 감퇴는 스트레스와 불안, 수면 부족 등 다양한 요인에서 비롯될 수 있으며, 규칙적인 생활습관 개선이 큰 도움이 됩니다.',
    '꾸준한 운동은 신체 건강은 물론 정신적인 안정과 우울감 완화에도 효과가 있으며, 일주일에 3회 이상 유산소 운동을 권장합니다.',
    '건강한 식습관을 유지하는 것은 면역력을 높이고, 감정 기복을 줄이는 데도 큰 역할을 하며 특히 아침 식사는 꼭 챙겨야 합니다.',
    '심호흡은 짧은 시간 안에 불안을 완화시킬 수 있는 효과적인 방법으로, 깊게 들이마시고 천천히 내쉬는 과정을 3회 이상 반복해보세요.',
    '충분한 수면은 하루의 피로를 회복시킬 뿐만 아니라, 집중력과 감정 조절 능력을 향상시키는 데에도 매우 중요한 요소입니다.',
  ];
  


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
              onPress={() => setNameModalVisible(true)}
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
              <View style={{ width: '100%', paddingHorizontal: 20, marginVertical: 16 }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 24,
                    textAlign: 'left',
                    fontWeight: '500',
                    color: '#333',
                  }}
                >
                  {recordScripts[recordedUris.length]}
                </Text>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={isNameModalVisible}
          onRequestClose={() => setNameModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>보이스 이름 설정</Text>
              <Text style={styles.nameSubtitle}>녹음된 음성을 어떤 이름으로 저장할까요?</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  width: '90%',
                  padding: 10,
                  marginBottom: 20,
                }}
                placeholder="예: 진영의 목소리"
                value={voiceName}
                onChangeText={setVoiceName}
              />
              <TouchableOpacity
                style={styles.recordButtonLarge}
                onPress={() => {
                  if (voiceName.trim().length === 0) {
                    Alert.alert('알림', '보이스 이름을 입력해주세요.');
                    return;
                  }
                  setNameModalVisible(false);
                  uploadVoiceClone(recordedUris, voiceName);
                }}
              >
                <Text style={styles.recordButtonText}>저장하기</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>

      </View>
    </SafeAreaView>
  );
}
