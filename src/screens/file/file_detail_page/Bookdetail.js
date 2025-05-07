import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';

export default function Bookdetail({ pdfUri }) {
  const openPDF = async (uri) => {
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri);
    } else {
      alert('이 디바이스에서는 PDF를 열 수 없습니다.');
    }
  };

  return (
    <View style={styles.card}>
      {pdfUri ? (
        <TouchableOpacity onPress={() => openPDF(pdfUri)} style={{ padding: 16 }}>
          <Text style={{ color: '#007AFF', textAlign: 'center', fontWeight: 'bold' }}>
            PDF 열기
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ textAlign: 'center', color: '#999' }}>PDF가 없습니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 440,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  info: {
    flex: 1,
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
  label: {
    color: '#979CA5',
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 2,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 2,
  },
  date: {
    color: '#979CA5',
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
  },
});
