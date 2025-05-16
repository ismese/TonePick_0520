import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './important_file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ImportantFilePage() {
  const navigation = useNavigation();
  const [bookNote, setBookNote] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchImportantNotes = async () => {
      try {
        const uid = await AsyncStorage.getItem('userUid');
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/pdfFiles`
        );
        const data = await response.json();
        if (!data.documents) return;

        const important = data.documents
          .map(doc => {
            const fields = doc.fields;
            return {
              title: fields.title?.stringValue || '',
              date: fields.createdAt?.timestampValue || '',
              uri: fields.uri?.stringValue || '',
              uid: fields.uid?.stringValue || '',
              name: doc.name,
              isFavorite: fields.isFavorite?.booleanValue || false,
            };
          })
          .filter(item => item.uid === uid && item.isFavorite);

        setBookNote(important);
        setFavorites(important.map(item => item.isFavorite));
      } catch (err) {
        console.error('중요 보드 불러오기 실패:', err);
      }
    };

    fetchImportantNotes();
  }, []);

  const toggleFavorite = async (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);

    const item = bookNote[index];
    try {
      await fetch(`https://firestore.googleapis.com/v1/${item.name}?updateMask.fieldPaths=isFavorite`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            isFavorite: { booleanValue: updated[index] },
          },
        }),
      });

      // 업데이트 후 목록 갱신
      setBookNote(prev =>
        prev.filter((_, i) => i === index ? updated[i] : true)
      );
    } catch (err) {
      Alert.alert('오류', '즐겨찾기 상태 변경 실패');
    }
  };

  const handleDelete = (index) => {
    Alert.alert(
      '삭제 확인',
      `'${bookNote[index].title}' 파일을 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            const updated = [...bookNote];
            updated.splice(index, 1);
            setBookNote(updated);

            const favs = [...favorites];
            favs.splice(index, 1);
            setFavorites(favs);
          },
        },
      ]
    );
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
        <Text style={styles.sectionTitle}>중요 북 노트</Text>
        <Text style={styles.sectionDesc}>당신이 중요하게 생각하는 노트를 담아봤어요.</Text>
      </View>

      <ScrollView style={styles.bookcontainer}>
        {bookNote.map((book, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('FileDetailPage', {
            pdfUri: book.uri,
            pdfName: book.title,
          })}>
            <View style={styles.bookCard}>
              <View style={styles.bookInfo}>
                <Text style={styles.bookLabel}>PDF</Text>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookDate}>{book.date}</Text>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                <TouchableOpacity onPress={() => handleDelete(index)} style={{ marginBottom: 12 }}>
                  <Icon name="more-vert" size={20} color="#A9A9A9" />
                </TouchableOpacity>

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
