import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { styles } from './file_detail_page_style';
import Bookdetail from './Bookdetail';
import { useNavigation, useRoute } from '@react-navigation/native';

const voiceList = [
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
];

const ELEVENLABS_API_KEY = 'sk_ce094edb48ebcd9c6cd7e8d3e532ef5229033587e104cecc';

export default function FileDetailPage() {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [showVoiceList, setShowVoiceList] = useState(false);
  const [firestoreVoiceList, setFirestoreVoiceList] = useState([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState(null);

  const route = useRoute();
  const {
    pdfUri,
    pdfName,
    pdfUri2,
    date,
    uid,
    name,
    default: isDefault,
  } = route.params || {};

  const playVoice = async (file, index) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(file);
    setSound(newSound);
    setPlayingIndex(index);
    await newSound.playAsync();

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.isPlaying) {
        setProgress(status.positionMillis / status.durationMillis);
      } else if (status.didJustFinish) {
        setPlayingIndex(null);
        setProgress(0);
      }
    });
  };

  const handleTTSPlay = async () => {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text: extractedText,
          model_id: 'eleven_multilingual_v2',
        }),
      });

      const ttsBlob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        const filePath = FileSystem.documentDirectory + `tts_${Date.now()}.mp3`;
        await FileSystem.writeAsStringAsync(filePath, base64data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const { sound: ttsSound } = await Audio.Sound.createAsync({ uri: filePath });
        await ttsSound.playAsync();
        setSound(ttsSound);
      };
      reader.readAsDataURL(ttsBlob);
    } catch (err) {
      console.error('TTS 생성 및 재생 오류:', err);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const fetchVoiceList = async () => {
      try {
        const response = await fetch(
          'https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/voice_id'
        );
        const data = await response.json();

        if (!data.documents) return;

        const voices = data.documents.map((doc) => ({
          id: doc.name.split('/').pop(),
          voiceId: doc.fields.voiceId?.stringValue || '',
          uid: doc.fields.uid?.stringValue || '',
        }));

        setFirestoreVoiceList(voices);
      } catch (err) {
        console.error('voice_id 불러오기 실패:', err);
      }
    };

    fetchVoiceList();
  }, []);

  const handleExtractTextAndShowVoices = async () => {
    if (!pdfUri2) return;
    setLoading(true);
    try {
      const res = await fetch('http://10.20.32.126:5000/pdf-to-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: pdfUri2 }),
      });
      const data = await res.json();
      setExtractedText(data.text || '');
      setShowVoiceList(true);
    } catch (err) {
      console.error('텍스트 추출 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={16} color="#473B3B" />
        </TouchableOpacity>
        <Text style={styles.title}>BOOKNOTE</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.sectionTitle}>보이스 선택</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.voiceScroll}>
        {voiceList.map((voice, index) => (
          <View key={index} style={styles.voiceCard}>
            <Image source={{ uri: 'https://placehold.co/60x60' }} style={styles.avatar} />
            <Text style={styles.voiceName}>{voice.name}</Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: playingIndex === index ? `${progress * 100}%` : '0%' },
                ]}
              />
            </View>
            <TouchableOpacity onPress={() => playVoice(voice.file, index)}>
              <Icon name="play-arrow" size={20} color="#1D1B20" marginTop={8} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <ScrollView vertical showsVerticalScrollIndicator={false} style={styles.bookContainer}>
        <Bookdetail pdfUri2={pdfUri2} />
      </ScrollView>

      <View>
        {pdfUri2 && (
            <View style={{marginBottom: 0,alignItems: 'center' }}>
              <TouchableOpacity
                onPress={handleExtractTextAndShowVoices}
                disabled={loading}
                style={{
                  backgroundColor: '#007AFF',
                  paddingVertical: 10,
                  paddingHorizontal: 145,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ width: 65,height:18, alignSelf:'center',alignItems: 'center' }}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Pretendard-Bold' }}>
                      텍스트 추출
                    </Text>
                  )}
                </View>
              </TouchableOpacity>



              {showVoiceList && !loading && (
                <>
                  
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                    {firestoreVoiceList.map((voice, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          Alert.alert(
                            '보이스 선택',
                            '선택한 보이스를 선택하시겠습니까?',
                            [
                              { text: '취소', style: 'cancel' },
                              {
                                text: '확인',
                                onPress: () => setSelectedVoiceId(voice.voiceId),
                              },
                            ],
                            { cancelable: true }
                          );
                        }}
                        style={{
                          backgroundColor: selectedVoiceId === voice.voiceId ? '#007AFF' : '#EFEFEF',
                          padding: 10,
                          borderRadius: 8,
                          marginRight: 8,
                        }}
                      >
                        <Text style={{ color: selectedVoiceId === voice.voiceId ? '#fff' : '#333' }}>
                          {voice.voiceId.slice(0, 10)}...
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}

              {selectedVoiceId && extractedText && (
                <TouchableOpacity
                  onPress={handleTTSPlay}
                  style={{
                    backgroundColor: '#FF6B6B',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 14 }}>🔊 음성 듣기</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

      </View>
    </SafeAreaView>
  );
}
