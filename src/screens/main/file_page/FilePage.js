// VoicePage.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './file_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FilePage() {
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
      <View style={styles.header}>
        <Text style={styles.title}>TOnePick</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="arrow-back-ios" size={18} color="#473B3B" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>북 노트</Text>
        <Text style={styles.sectionDesc}>당신의 자료를 추가하세요.</Text>
      </View>

      <ScrollView style={styles.bookcontainer}>
            {bookNote.map((book, index) => (
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

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={26} color="#473B3B" />
          <Text style={styles.navLabelActive}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
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