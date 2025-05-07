// VoicePage.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from './voice_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function VoicePage() {
  const navigation = useNavigation();

  const [voiceList, setVoiceList] = useState([
    { name: '아빠님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '할머니님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '성수님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '마크님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '마크님의 목소리', file: require('../../../../assets/voice.wav') },
    { name: '마크님의 목소리', file: require('../../../../assets/voice.wav') },
  ]);

  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState({});
  const [favorites, setFavorites] = useState(Array(6).fill(false));

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

  const toggleFavorite = (index) => {
    const updated = [...favorites];
    updated[index] = !updated[index];
    setFavorites(updated);
  };

  const handleDelete = (index) => {
    Alert.alert(
      '삭제 확인',
      `'${voiceList[index].name}' 보이스를 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            const updatedList = [...voiceList];
            updatedList.splice(index, 1);
            setVoiceList(updatedList);

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
              <TouchableOpacity onPress={() => toggleFavorite(index)}>
                <Icon
                  name={favorites[index] ? 'favorite' : 'favorite-border'}
                  size={20}
                  color={favorites[index] ? '#FF6B6B' : '#AEAEAE'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => playVoice(voice.file, index)}>
                <Icon name="play-arrow" size={24} color="#1D1B20" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Icon name="more-vert" size={20} color="#AEAEAE" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 하단 추가하기 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('추가하기')}>
        <Icon name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
