import React from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // 추가

export default function FilePage() {
  const navigation = useNavigation(); // 추가

  const bookNote = [
    { title: '헨젤과 그레텔.pdf', date: '2025. 03. 24. 15:40' },
    { title: '엄마의 편지.pdf', date: '2025. 03. 24. 15:40' },
    { title: '살인자의 쇼핑몰.pdf', date: '2025. 03. 24. 15:40' },
    { title: '급류.pdf', date: '2025. 03. 24. 15:40' },
    { title: '헨젤과 그레텔.pdf', date: '2025. 03. 24. 15:40' },
    { title: '엄마의 편지.pdf', date: '2025. 03. 24. 15:40' },
    { title: '살인자의 쇼핑몰.pdf', date: '2025. 03. 24. 15:40' },
    { title: '급류.pdf', date: '2025. 03. 24. 15:40' },
  ];

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
      <ScrollView style={styles.bookcontainer}>
        {bookNote.map((book, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => navigation.navigate('FileDetailPage')} // ✅ 여기에 추가!
          >
            <View style={styles.bookCard}>
              <View style={styles.bookInfo}>
                <Text style={styles.bookLabel}>PDF</Text>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookDate}>{book.date}</Text>
              </View>
              <TouchableOpacity>
                <Icon name="more-vert" size={20} color="#A9A9A9" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 하단 네비게이션 */}
      
      <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MainPage')}>
          <Icon name="home" size={26} color="#473B3B" />
          <Text style={styles.navLabelActive}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="person" size={24} color="#A9A9A9" />
          <Text style={styles.navLabel}>내 정보</Text>
        </TouchableOpacity>
      </View>

      {/* 플로팅 버튼 */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={25} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
