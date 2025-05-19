import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useBookNote } from '../../../../context/BookNoteContext';
import { styles } from './pdf_page_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const CLOUD_NAME = 'dcprq8wxd';
const UPLOAD_PRESET = 'unsigned_pdf_upload';

export default function PdfPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { uri } = route.params || {};
  const { addBookNote } = useBookNote();
  const [fileTitle, setFileTitle] = useState('');

  const handleConfirm = async () => {
    if (!fileTitle.trim()) {
      Alert.alert('파일명을 입력해주세요.');
      return;
    }

    const safeTitle = fileTitle.trim().endsWith('.pdf')
      ? fileTitle.trim()
      : `${fileTitle.trim()}.pdf`;

    try {
      const userUid = await AsyncStorage.getItem('userUid');
      if (!userUid) throw new Error('로그인 정보가 없습니다.');

      // ✅ Cloudinary 업로드
      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append('file', `data:application/pdf;base64,${base64File}`);
      formData.append('upload_preset', UPLOAD_PRESET);

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });

      const cloudData = await cloudRes.json();
      if (!cloudData.secure_url) throw new Error('Cloudinary 업로드 실패');

      const uploadedUrl = cloudData.secure_url;

      // ✅ Context 저장
      addBookNote(safeTitle, uri);

      // ✅ Firestore 저장
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/tonpick-7e5d2/databases/(default)/documents/pdfFiles?documentId=${Date.now()}`;

      await fetch(firestoreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            uid: { stringValue: userUid },
            title: { stringValue: safeTitle },
            uri: { stringValue: uri },
            uri2: { stringValue: uploadedUrl },
            createdAt: { timestampValue: new Date().toISOString() },
            default: { booleanValue: false },
          },
        }),
      });

      Alert.alert('저장이 완료되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.error('업로드 오류:', error);
      Alert.alert('오류', 'PDF 업로드 또는 저장에 실패했습니다.');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={22} color="#473B3B" />
        </TouchableOpacity>
        <Text style={styles.title}>파일을 저장할까요?</Text>
        <Text style={styles.subTitle}>파일명을 입력 후 저장하세요.</Text>

        <TextInput
          placeholder="파일명을 입력하세요"
          value={fileTitle}
          onChangeText={setFileTitle}
          style={styles.input}
        />
      </View>

      {uri ? (
        <View style={styles.previewContainer}>
          <WebView originWhitelist={['*']} source={{ uri }} style={styles.pdfPreview} />
        </View>
      ) : (
        <Text style={{ padding: 20, color: '#999' }}>
          PDF 파일이 제공되지 않았습니다.
        </Text>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeButton} onPress={handleConfirm}>
          <Text style={styles.completeButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
