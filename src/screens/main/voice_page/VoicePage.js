import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import { styles } from './voice_page_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function VoicePage() {
  const navigation = useNavigation();
  const [voiceList, setVoiceList] = useState([]);
  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
  }, []);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch(
          'https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/voice_id'
        );
        const data = await res.json();
        if (!data.documents) return;

        const allVoices = data.documents.map((doc) => ({
          name: `사용자 목소리 (${doc.fields.createdAt?.timestampValue?.slice(0, 10) || ''})`,
          file: { uri: doc.fields.audioPath.stringValue },
        }));

        setVoiceList(allVoices);
        setFavorites(Array(allVoices.length).fill(false));
      } catch (err) {
        console.error('🔥 voice 전체 불러오기 실패:', err);
      }
    };
    fetchVoices();
  }, []);

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
    if (sound && playingIndex === index) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setPlayingIndex(null);
      setProgress((prev) => ({ ...prev, [index]: 0 }));
      return;
    }

    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(file);
    setSound(newSound);
    setPlayingIndex(index);
    await newSound.playAsync();

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.isPlaying) {
        setProgress((prev) => ({
          ...prev,
          [index]: status.positionMillis / status.durationMillis,
        }));
      } else if (status.didJustFinish) {
        setPlayingIndex(null);
        setProgress((prev) => ({ ...prev, [index]: 0 }));
      }
    });
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

  const renderCard = ({ item, index }) => (
    <View key={index} style={styles.card}>
      <Image source={{ uri: 'https://placehold.co/80x80' }} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${(progress[index] || 0) * 100}%` }]} />
        </View>
      </View>
      <View style={styles.cardIcons}>
        <TouchableOpacity onPress={() => toggleFavorite(index)}>
          <Icon
            name={favorites[index] ? 'favorite' : 'favorite-border'}
            size={20}
            color={favorites[index] ? '#FF6B6B' : '#AEAEAE'}
            style={{ top: 2 }}
          />
        </TouchableOpacity>
        {playingIndex === index ? (
          <TouchableOpacity onPress={async () => {
            if (sound) {
              await sound.stopAsync();
              await sound.unloadAsync();
              setSound(null);
              setPlayingIndex(null);
              setProgress((prev) => ({ ...prev, [index]: 0 }));
            }
          }}>
            <Icon name="stop" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => playVoice(item.file, index)}>
            <Icon
              name="play-arrow"
              size={24}
              color={playingIndex === index ? '#FF6B6B' : '#1D1B20'}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleDelete(index)}>
          <Icon name="more-vert" size={20} color="#AEAEAE" style={{ top: 2 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

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
      <FlatList
        data={voiceList}
        renderItem={renderCard}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.cardList}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 24 }}
      />
    </SafeAreaView>
  );
}
