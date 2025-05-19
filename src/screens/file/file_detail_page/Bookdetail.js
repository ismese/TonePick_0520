import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Bookdetail({ pdfUri2 }) {
  useEffect(() => {
    console.log('📎 전달받은 pdfUri2:', pdfUri2);
  }, [pdfUri2]);

  const isValidUrl = pdfUri2?.startsWith('http');

  return (
    <View style={styles.card}>
      {isValidUrl ? (
        <>
          <Text style={styles.header}>📄 PDF 미리보기</Text>
          <WebView
            source={{ uri: pdfUri2 }}
            style={styles.webview}
            useWebKit={true}
            originWhitelist={['*']}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowFileAccess
            allowsInlineMediaPlayback
          />
        </>
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.noPdf}>⚠️ PDF가 제공되지 않았습니다.</Text>
          <Text style={styles.small}>Cloudinary에 업로드된 URL이 없거나 잘못 전달되었습니다.</Text>
        </View>
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
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: 380,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 380,
  },
  noPdf: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginBottom: 6,
  },
  small: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 13,
  },
});
