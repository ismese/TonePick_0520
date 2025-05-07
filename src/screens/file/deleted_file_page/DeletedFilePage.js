// DeletedFilePage.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './deleted_file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function DeletedFilePage() {
  const navigation = useNavigation();

  const initialDeletedBookNote = [
    { title: '슬기로운 의사 생활.pdf', date: '2025. 03. 24. 15:40' },
    { title: '폭삭 속았수다.pdf', date: '2025. 04. 29. 15:40' },
    { title: '진영의 거인.pdf', date: '2026. 03. 24. 15:40' },
  ];

  const [deletedBookNote, setDeletedBookNote] = useState(initialDeletedBookNote);
  const [favorites, setFavorites] = useState(Array(initialDeletedBookNote.length).fill(false));

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
  };

  const handleDelete = (index) => {
    Alert.alert(
      '삭제 확인',
      `'${deletedBookNote[index].title}' 파일을 완전히 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            const updatedList = [...deletedBookNote];
            updatedList.splice(index, 1);
            setDeletedBookNote(updatedList);

            const updatedFav = [...favorites];
            updatedFav.splice(index, 1);
            setFavorites(updatedFav);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={18} color="#473B3B" />
        </TouchableOpacity>
        <Text style={styles.title}>TOnePick</Text>
      </View>

      {/* 섹션 제목 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>삭제된 북 노트</Text>
        <Text style={styles.sectionDesc}>삭제된 자료 목록입니다.</Text>
      </View>

      {/* 북노트 리스트 */}
      <ScrollView style={styles.bookcontainer}>
        {deletedBookNote.map((book, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('FileDetailPage')}>
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
