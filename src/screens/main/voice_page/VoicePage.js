// VoicePage.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from './voice_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native'; // 추가

export default function VoicePage() {
  const navigation = useNavigation(); // 추가

  const voiceList = [
    { name: '아빠님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '할머니님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '성수님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '마크님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '마크님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '마크님의 목소리', file: require('../../../../assets/voice.wav') },
  ];

  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    let interval;
    if (sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          setProgress((prev) => ({
            ...prev,
            [playingIndex]: status.positionMillis / status.durationMillis,
          }));
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [sound, playingIndex]);

  const playVoice = async (file, index) => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    const { sound: newSound } = await Audio.Sound.createAsync(file);
    setSound(newSound);
    setPlayingIndex(index);
    await newSound.playAsync();
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
        <Text style={styles.sectionTitle}>보이스 노트</Text>
        <Text style={styles.sectionDesc}>당신의 목소리를 추가하세요.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardList}>
        {voiceList.map((voice, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: 'https://placehold.co/80x80' }} style={styles.cardImage} />
            <Text style={styles.cardName}>{voice.name}</Text>

            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(progress[index] || 0) * 100}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.cardIcons}>
              <TouchableOpacity>
                <Icon name="favorite" size={20} color="#AEAEAE" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playVoice(voice.file, index)}>
                <Icon name="play-arrow" size={24} color="#1D1B20" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="more-vert" size={20} color="#AEAEAE" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

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

      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={25} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
