import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native'; // 상단에 import 추가
import * as DocumentPicker from 'expo-document-picker';


export default function FilePage() {
  const navigation = useNavigation();

  const [bookNote, setBookNote] = useState([
    { title: '헨젤과 그레텔.pdf', date: '2025. 03. 24. 15:40' },
    { title: '엄마의 편지.pdf', date: '2025. 03. 24. 15:40' },
    { title: '살인자의 쇼핑몰.pdf', date: '2025. 03. 24. 15:40' },
    { title: '급류.pdf', date: '2025. 03. 24. 15:40' },
    { title: '헨젤과 그레텔.pdf', date: '2025. 03. 24. 15:40' },
    { title: '엄마의 편지.pdf', date: '2025. 03. 24. 15:40' },
    { title: '살인자의 쇼핑몰.pdf', date: '2025. 03. 24. 15:40' },
    { title: '급류.pdf', date: '2025. 03. 24. 15:40' },
  ]);

  const [favorites, setFavorites] = useState(Array(bookNote.length).fill(false));

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
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
  
            const updatedFav = [...favorites];
            updatedFav.splice(index, 1);
            setFavorites(updatedFav);
          },
        },
      ]
    );
  };

  const handleAddFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });
  
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
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={18} color="#473B3B" />
        </TouchableOpacity>
        <Text style={styles.title}>TOnePick</Text>
      </View>

      {/* 섹션 제목 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>북 노트</Text>
        <Text style={styles.sectionDesc}>당신의 자료를 추가하세요.</Text>
      </View>

      {/* 북노트 리스트 */}
      <ScrollView style={styles.bookcontainer} contentContainerStyle={{ paddingBottom: 100 }}>
        {bookNote.map((book, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => navigation.navigate('FileDetailPage')}
          >
            <View style={styles.bookCard}>
              <View style={styles.bookInfo}>
                <Text style={styles.bookLabel}>PDF</Text>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookDate}>{book.date}</Text>
              </View>

              {/* 오른쪽 아이콘 영역 */}
              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                {/* 옵션 버튼 (위) */}
                <TouchableOpacity onPress={() => handleDelete(index)} style={{ marginBottom: 12 }}>
                  <Icon name="more-vert" size={20} color="#A9A9A9" />
                </TouchableOpacity>


                {/* 하트 버튼 (아래) */}
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

      {/* 하단 추가하기 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddFile}>
        <Icon name="add" size={28} color="white" />
      </TouchableOpacity>


    </SafeAreaView>
  );
}
