import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './deleted_file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeletedFilePage() {
  const navigation = useNavigation();
  const [deletedBookNote, setDeletedBookNote] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchDeletedNotes = async () => {
      try {
        const uid = await AsyncStorage.getItem('userUid'); //  로그인한 사용자
        const url = `https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/deletedPdfFiles`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.documents) return;

        const validDocs = data.documents
          .map(doc => {
            const fields = doc.fields;
            return {
              title: fields.title.stringValue,
              date: fields.deletedAt.timestampValue,
              uri: fields.uri.stringValue,
              uid: fields.uid?.stringValue || null,
              name: doc.name,
              favorite: fields.isFavorite?.booleanValue || false,
              deletedAt: fields.deletedAt.timestampValue,
            };
          })
          .filter(doc => doc.uid === uid && !isExpired(doc.deletedAt)); //  30일 이내 파일만

        setDeletedBookNote(validDocs);
        setFavorites(validDocs.map(d => d.favorite));
      } catch (err) {
        console.error('삭제된 문서 불러오기 실패:', err);
      }
    };

    fetchDeletedNotes();
  }, []);

  // ✅ 30일 지난 파일 숨기기
  const isExpired = (timestamp) => {
    const now = new Date();
    const deletedDate = new Date(timestamp);
    const diff = now.getTime() - deletedDate.getTime();
    return diff > 30 * 24 * 60 * 60 * 1000;
  };

  // ✅ 복구 기능
  const handleRestore = async (index) => {
    const file = deletedBookNote[index];
    try {
      // 복구: 원래 pdfFiles 컬렉션으로 이동
      await fetch(`https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/pdfFiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            title: { stringValue: file.title },
            uri: { stringValue: file.uri },
            uid: { stringValue: file.uid },
            isFavorite: { booleanValue: file.favorite },
            createdAt: { timestampValue: new Date().toISOString() },
          },
        }),
      });

      // 삭제된 문서 Firestore에서 제거
      await fetch(`https://firestore.googleapis.com/v1/${file.name}`, {
        method: 'DELETE',
      });

      const updatedList = [...deletedBookNote];
      updatedList.splice(index, 1);
      setDeletedBookNote(updatedList);

      const updatedFav = [...favorites];
      updatedFav.splice(index, 1);
      setFavorites(updatedFav);

      Alert.alert('복구 완료', '파일이 복구되었습니다.');
    } catch (err) {
      console.error('복구 실패:', err);
      Alert.alert('오류', '복구 중 문제가 발생했습니다.');
    }
  };

  // ✅ 완전 삭제 기능
  const handleDelete = (index) => {
    Alert.alert(
      '삭제 확인',
      `'${deletedBookNote[index].title}' 파일을 완전히 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            const file = deletedBookNote[index];
            try {
              await fetch(`https://firestore.googleapis.com/v1/${file.name}`, {
                method: 'DELETE',
              });

              const updatedList = [...deletedBookNote];
              updatedList.splice(index, 1);
              setDeletedBookNote(updatedList);

              const updatedFav = [...favorites];
              updatedFav.splice(index, 1);
              setFavorites(updatedFav);
            } catch (err) {
              Alert.alert('삭제 실패', 'Firestore 삭제 중 오류가 발생했습니다.');
            }
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
        <Text style={styles.sectionTitle}>삭제된 북 노트</Text>
        <Text style={styles.sectionDesc}>삭제된 자료 목록입니다.</Text>
      </View>

      <ScrollView style={styles.bookcontainer}>
        {deletedBookNote.map((book, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.bookCard}>
              <View style={styles.bookInfo}>
                <Text style={styles.bookLabel}>PDF</Text>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookDate}>{book.date}</Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                <TouchableOpacity onPress={() => handleRestore(index)} style={{ marginBottom: 12 }}>
                  <Icon name="restore" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Icon name="delete-forever" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
