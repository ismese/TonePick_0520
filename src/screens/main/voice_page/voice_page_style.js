import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE9E9',
  },
  header: {
    height: 60,
    justifyContent: 'center', // ← 가운데 텍스트 중심
    alignItems: 'center',
    position: 'relative',     // ← 메뉴 버튼 절대 위치 기준
  },
  
  title: {
    color: '#473B3B',
    fontSize: 22,
    fontFamily: 'Pretendard',
    fontWeight: '800',
    lineHeight: 30,
    textAlign: 'center',
  },
  
  menuButton: {
    position: 'absolute',
    left: 28,                // ← 화면 오른쪽 여백
    top: 22,                  // ← 세로 위치 조정
  },
  menuIcon: {
    width: 36,
    height: 36,
  },
  section: {
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#473B3B',
    lineHeight: 28,
  },
  sectionDesc: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: '#757575',
    marginTop: 6,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap:30,
    rowGap:20,
    paddingVertical: 20,
  },
  card: {
    width: 156,
    height: 219,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 4,
    borderColor: 'white',
    zIndex: 10,
    paddingTop: 28,
    alignItems: 'center',
    position: 'relative',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    backgroundColor: '#E3E3E3',
  },
  cardName: {
    marginTop: 20,
    fontSize: 12,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    color: 'black',
    lineHeight: 16.8,
  },
  progressBarContainer: {
    marginTop: 10,
    width: 113,
    height: 4,
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: '#E3E3E3',
    borderRadius: 100,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 100,
  },
  cardIcons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    gap: 20,
  },
  bottomNav: {
    height:'12%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navIconHome: {
    width: 20,
    height: 20,
    backgroundColor: '#473B3B',
  },
  navIconInfo: {
    width: 20,
    height: 20,
    backgroundColor: '#CCD0D7',
  },
  navLabelActive: {
    color: '#473B3B',
    fontSize: 10,
    fontFamily: 'Pretendard',
    fontWeight: '500',
  },
  navLabel: {
    color: '#CCD0D7',
    fontSize: 10,
    fontFamily: 'Pretendard',
    fontWeight: '500',
  },
});
