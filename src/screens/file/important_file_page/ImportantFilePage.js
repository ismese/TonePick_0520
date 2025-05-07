// ImportantFilePage.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from './important_file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function ImportantFilePage() {
  const navigation = useNavigation();

  const initialBookNote = [
    { title: '헨젤과 그레텔.pdf', date: '2025. 03. 24. 15:40' },
    { title: '엄마의 편지.pdf', date: '2025. 03. 24. 15:40' },
  ];

  const [bookNote, setBookNote] = useState(initialBookNote);
  const [favorites, setFavorites] = useState(Array(initialBookNote.length).fill(false));

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
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
            const updatedList = [...bookNote];
            updatedList.splice(index, 1);
            setBookNote(updatedList);

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
        <Text style={styles.sectionTitle}>중요 북 노트</Text>
        <Text style={styles.sectionDesc}>당신이 중요하게 생각하는 노트를 담아봤어요.</Text>
      </View>

      {/* 북노트 리스트 */}
      <ScrollView style={styles.bookcontainer}>
        {bookNote.map((book, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('FileDetailPage')}>
            <View style={styles.bookCard}>
              <View style={styles.bookInfo}>
                <Text style={styles.bookLabel}>PDF</Text>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookDate}>{book.date}</Text>
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                {/* 삭제 버튼 */}
                <TouchableOpacity onPress={() => handleDelete(index)} style={{ marginBottom: 12 }}>
                  <Icon name="more-vert" size={20} color="#A9A9A9" />
                </TouchableOpacity>

                {/* 찜 버튼 */}
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
