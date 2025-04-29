// MainPage.js
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './main_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; 

const voiceNotes = [
  { name: '강양님의 목소리' },
  { name: '마크님의 목소리' },
  { name: '리쿠님의 목소리' },
  { name: '성수님의 목소리' },
];

const bookNotes = [
  { title: '헨젤과 그레텔.pdf', date: '2025. 03. 24. 15:40' },
  { title: '엄마의 편지.pdf', date: '2025. 03. 24. 15:40' },
  { title: '살인자의 쇼핑몰.pdf', date: '2025. 03. 24. 15:40' },
  { title: '급류.pdf', date: '2025. 03. 24. 15:40' },
];

export default function MainPage() {
  const navigation = useNavigation(); 
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
            <TouchableOpacity>
                <View key={index} style={styles.voiceCard}>
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
                <TouchableOpacity>
                <View key={index} style={styles.bookCard}>
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

      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={25} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
