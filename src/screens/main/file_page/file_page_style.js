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
    paddingBottom: 20,
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
  bookcontainer: {
    paddingHorizontal:20,
    height: 380,
  },

  bookCard: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookInfo: {
    flex: 1,
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
  bookLabel: {
    color: '#979CA5',
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 19.6,
    marginBottom: 2,
  },
  bookTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 22.4,
    marginBottom: 2,
  },
  bookDate: {
    color: '#979CA5',
    fontSize: 12,
    fontFamily: 'Pretendard-Regualr',
    lineHeight: 16.8,
  },
  optionIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#A9A9A9',
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
  addButton: {
    width: 66,
    height: 66,
    backgroundColor: '#705F5F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 30,
    bottom: 48,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 4,
    borderColor: 'white',
    zIndex: 10,
  },
  
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Pretendard',
  },
  
});
