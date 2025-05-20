import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FilePage() {
  const navigation = useNavigation();
  const [bookNote, setBookNote] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
          .map(doc => {
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
          .filter(doc => doc.default === true || doc.uid === userUid);

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

  const handleExtractText = async (cloudUrl) => {
    try {
      const res = await fetch('http://10.20.66.16:5000/pdf-to-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cloudUrl }),
      });
      const data = await res.json();
      Alert.alert('📄 텍스트 추출 결과', data.text || '추출된 내용이 없습니다.');
    } catch (err) {
      Alert.alert('❌ 오류', '텍스트 추출 중 문제가 발생했습니다.');
    }
  };

  const handleAddFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });

    if (!result.canceled && result.assets.length > 0) {
      const selectedFile = result.assets[0];
      navigation.navigate('FileDetailPage', {
        pdfUri: selectedFile.uri,
        pdfName: selectedFile.name,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={18} color="#473B3B" />
        </TouchableOpacity>
        <Text style={styles.title}>TOnePick</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>북 노트</Text>
        <Text style={styles.sectionDesc}>당신의 자료를 추가하세요.</Text>
      </View>

      <ScrollView style={styles.bookcontainer} contentContainerStyle={{ paddingBottom: 100 }}>
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

                  {/* 아이콘 정렬 박스 */}
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

    </SafeAreaView>
  );
}
