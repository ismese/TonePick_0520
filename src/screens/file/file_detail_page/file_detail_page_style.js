import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 22,
  },
  title: {
    color: '#473B3B',
    fontSize: 16,
    fontFamily: 'Pretendard',
    fontWeight: '800',
    lineHeight: 16,
    textAlign: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    color: '#473B3B',
    lineHeight: 28,
  },
  close: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#8C8C8C',
    lineHeight: 20,
  },
  voiceScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxHeight: 190, // 카드 전체 높이 + margin 여유
  },
  
  voiceCard: {
    width: 104,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginRight: 10, // ← 카드 간격 조정
    alignItems: 'center',
    justifyContent: 'space-between', // 내부 정렬 간격 유지
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: '#E3E3E3',
  },
  voiceName: {
    marginTop: 10,
    fontSize: 11,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    color: 'black',
    lineHeight: 15.4,
    textAlign: 'center',
  },
  progressBarBackground: {
    width: 80,
    height: 4,
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 100,
  },

  bookContainer: {
    paddingHorizontal: 20,
    paddingVertical:10,
  },
});
