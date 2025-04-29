import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import { styles } from './file_detail_page_style';
import Bookdetail from './Bookdetail';
import { useNavigation } from '@react-navigation/native';

const voiceList = [
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
  { name: '강양님의 목소리', file: require('../../../../assets/voice.wav') },
];

export default function FileDetailPage() {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  const playVoice = async (file, index) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(file);
    setSound(newSound);
    setPlayingIndex(index);
    await newSound.playAsync();

    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.isPlaying) {
        setProgress(status.positionMillis / status.durationMillis);
      } else if (status.didJustFinish) {
        setPlayingIndex(null);
        setProgress(0);
      }
    });
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={16} color="#473B3B" />
        </TouchableOpacity>
            <Text style={styles.title}>BOOKNOTE</Text>
        </View>

        <View style={styles.subHeader}>
            <Text style={styles.sectionTitle}>보이스 선택</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.voiceScroll}>
            {voiceList.map((voice, index) => (
            <View key={index} style={styles.voiceCard}>
                <Image source={{ uri: 'https://placehold.co/60x60' }} style={styles.avatar} />
                <Text style={styles.voiceName}>{voice.name}</Text>
                <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: playingIndex === index ? `${progress * 100}%` : '0%' }]} />
                </View>
                <TouchableOpacity onPress={() => playVoice(voice.file, index)}>
                <Icon name="play-arrow" size={20} color="#1D1B20" marginTop={8} />
                </TouchableOpacity>
            </View>
            ))}
        </ScrollView>

        <ScrollView vertical showsHorizontalScrollIndicator={false} style={styles.bookContainer}>
            <Bookdetail> </Bookdetail>
        </ScrollView>
        
        </SafeAreaView>
  );
}
