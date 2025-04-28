import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function Bookdetail({ title, date, onPressMore }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
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
