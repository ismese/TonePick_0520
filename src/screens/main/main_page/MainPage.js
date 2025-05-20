// MainPage.js (수정됨 - PDF 버튼 클릭 시 FileDetailPage 이동)
import React, { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {
  Alert,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { styles } from './main_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function MainPage() {
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookNote, setBookNote] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [voiceList, setVoiceList] = useState([]);

  useEffect(() => {
    const fetchVoiceNotes = async () => {
      try {
        const res = await fetch(
          'https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/voice_id'
        );
        const data = await res.json();
        if (!data.documents) return;

        const result = data.documents.map((doc) => ({
          uri: doc.fields.audioPath.stringValue,
          name: `Voice (${doc.fields.createdAt.timestampValue.slice(0, 10)})`,
        }));

        setVoiceList(result);
      } catch (err) {
        console.error('음성 노트 불러오기 실패:', err);
      }
    };

    fetchVoiceNotes();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userUid = await AsyncStorage.getItem('userUid');
        if (!userUid) return;

        const url = `https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/pdfFiles`;
        const response = await fetch(url);
        const data = await response.json();
        if (!data.documents) return;

        const filtered = data.documents
          .map((doc) => {
            const fields = doc.fields;
            return {
              title: fields.title.stringValue,
              date: fields.createdAt.timestampValue,
              uri: fields.uri.stringValue,
              uri2: fields.uri2?.stringValue || '',
              name: doc.name,
              uid: fields.uid?.stringValue || null,
              default: fields.default?.booleanValue || false,
            };
          })
          .filter((doc) => doc.default === true || doc.uid === userUid);

        setBookNote(filtered);
        setFavorites(Array(filtered.length).fill(false));
      } catch (error) {
        console.error('북노트 불러오기 실패:', error);
      }
    };

    fetchNotes();
  }, []);

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  const handleDelete = async (index) => {
    const fileToDelete = bookNote[index];
    Alert.alert(
      '삭제 확인',
      `'${fileToDelete.title}' 파일을 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch(`https://firestore.googleapis.com/v1/${fileToDelete.name}`, {
                method: 'DELETE',
              });
              const updated = [...bookNote];
              updated.splice(index, 1);
              setBookNote(updated);
              const updatedFav = [...favorites];
              updatedFav.splice(index, 1);
              setFavorites(updatedFav);
            } catch (err) {
              Alert.alert('삭제 실패', '데이터 삭제 중 오류가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  const handlePdfPickAndNavigate = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
  
      if (result.canceled || result.assets.length === 0) return;
  
      const selectedFile = result.assets[0];
      setShowAddModal(false); // 모달 닫기
  
      navigation.navigate('PdfPage', {
        uri: selectedFile.uri, // PdfPage는 이걸 props로 받음
      });
    } catch (error) {
      Alert.alert('PDF 선택 실패', error.message);
    }
  };
  

  const playVoice = async (uri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (err) {
      Alert.alert('재생 실패', '음성 파일을 재생할 수 없습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8F9" />

      <View contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>TOnePick</Text>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('ListPage')}
          >
            <Image style={styles.menuIcon} source={require('../../../../assets/Icon Button.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>보이스 노트</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VoicePage')}>
            <Text style={styles.seeMore}>더보기</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.voiceScroll}>
          {voiceList.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => playVoice(item.uri)}>
              <View style={styles.voiceCard}>
                <Image source={{ uri: 'https://placehold.co/70x70' }} style={styles.voiceImage} />
                <Text style={styles.voiceName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>북노트</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FilePage')}>
            <Text style={styles.seeMore}>더보기</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.bookcontainer}>
          {bookNote.map((book, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('FileDetailPage', {
                  pdfUri: book.uri,
                  pdfName: book.title,
                  pdfUri2: book.uri2,
                  date: book.date,
                  uid: book.uid,
                  name: book.name,
                  default: book.default,
                })
              }
            >
              <View style={styles.bookCard}>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookLabel}>PDF</Text>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookDate}>
                    {new Date(book.date).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    }).replace(/\. /g, '.').replace('.', '.')}
                  </Text>
                </View>

                <View style={{
                  position: 'absolute',
                  right: 12,
                  top: 12,
                  bottom: 12,
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                  {!book.default && (
                    <TouchableOpacity onPress={() => handleDelete(index)}>
                      <Icon name="more-vert" size={20} color="#A9A9A9" top={5} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => toggleFavorite(index)}>
                    <Icon
                      name={favorites[index] ? 'favorite' : 'favorite-border'}
                      size={20}
                      color={favorites[index] ? '#FF6B6B' : '#A9A9A9'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={26} color="#473B3B" />
          <Text style={styles.navLabelActive}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="person" size={24} color="#A9A9A9" />
          <Text style={styles.navLabel}>내 정보</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => setShowAddModal(true)}>
        <Icon name="add" size={25} color="#ffffff" />
      </TouchableOpacity>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddModal(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowAddModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>새로 만들기</Text>
            <View style={styles.modalOptions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowAddModal(false);
                  navigation.navigate('RecordPage');
                }}
              >
                <Image source={require('../../../../assets/mic.png')} style={styles.modalIcon} />
                <Text style={styles.modalLabel}>녹음</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handlePdfPickAndNavigate}
              >
                <Image source={require('../../../../assets/pdf.png')} style={styles.modalIcon} />
                <Text style={styles.modalLabel}>PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
