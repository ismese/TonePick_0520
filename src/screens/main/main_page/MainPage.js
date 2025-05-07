import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { styles } from './main_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const initialBookNotes = [
  { title: '헨젤과 그레텔.pdf', date: '2025. 03. 24. 15:40' },
  { title: '엄마의 편지.pdf', date: '2025. 03. 24. 15:40' },
  { title: '살인자의 쇼핑몰.pdf', date: '2025. 03. 24. 15:40' },
  { title: '급류.pdf', date: '2025. 03. 24. 15:40' },
];

export default function MainPage() {
  const navigation = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookNotes, setBookNotes] = useState(initialBookNotes);
  const [favorites, setFavorites] = useState(Array(initialBookNotes.length).fill(false));

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
  };
  const voiceNotes = [
    { name: '강양님의 목소리' },
    { name: '마크님의 목소리' },
    { name: '리쿠님의 목소리' },
    { name: '성수님의 목소리' },
  ];
  
  const handleDelete = (index) => {
    Alert.alert(
      '삭제 확인',
      `'${bookNotes[index].title}' 파일을 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            const updatedList = [...bookNotes];
            updatedList.splice(index, 1);
            setBookNotes(updatedList);

            const updatedFav = [...favorites];
            updatedFav.splice(index, 1);
            setFavorites(updatedFav);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8F9" />

      <View contentContainerStyle={styles.scrollContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>TOnePick</Text>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('ListPage')}>
            <Image style={styles.menuIcon} source={require('../../../../assets/Icon Button.png')} />
          </TouchableOpacity>
        </View>

        {/* 보이스 노트 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>보이스 노트</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VoicePage')}>
            <Text style={styles.seeMore}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.voiceScroll}>
          {voiceNotes.map((item, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.voiceCard}>
                <Image source={{ uri: 'https://placehold.co/70x70' }} style={styles.voiceImage} />
                <Text style={styles.voiceName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 북노트 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>북노트</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FilePage')}>
            <Text style={styles.seeMore}>더보기</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.bookcontainer}>
          {bookNotes.map((book, index) => (
            <TouchableOpacity key={index}>
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
      </View>

      {/* 하단 네비게이션 */}
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

      {/* + 버튼 */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowAddModal(true)}>
        <Icon name="add" size={25} color="#ffffff" />
      </TouchableOpacity>

      {/* 하단 모달 */}
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
                onPress={() => {
                  setShowAddModal(false);
                  navigation.navigate('FilePage');
                }}
              >
                <Image source={require('../../../../assets/file.png')} style={styles.modalIcon} />
                <Text style={styles.modalLabel}>파일</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}