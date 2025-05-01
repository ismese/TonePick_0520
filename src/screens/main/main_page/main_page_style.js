// main_page_style.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#EBE9E9',
  },
  scrollContent: {
    paddingBottom: 100, // 하단 여유 공간 확보
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
    right: 20,                // ← 화면 오른쪽 여백
    top: 12,                  // ← 세로 위치 조정
  },
  menuIcon: {
    width: 36,
    height: 36,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal:25,
    paddingBottom:10,
  },
  sectionTitle: {
    color: '#473B3B',
    fontSize: 20,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    lineHeight: 28,
  },
  seeMore: {
    color: '#8C8C8C',
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 20,
  },
  voiceScroll: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical:10,
  },
  voiceCard: {
    width: 138,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  voiceImage: {
    width: 70,
    height: 70,
    borderRadius: 9999,
    backgroundColor: '#E3E3E3',
  },
  voiceName: {
    marginTop: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    lineHeight: 16.8,
  },
  bookcontainer: {
    paddingHorizontal:10,
    height: 380,
  },

  bookCard: {
    width: '100%',
    height: 100,
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
  fab: {
    width: 66,
    height: 66,
    backgroundColor: '#705F5F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
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
  fabIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#F5F5F5',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 36,
    paddingBottom: 60,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Pretendard',
    fontWeight: '700',
    color: '#473B3B',
    marginBottom: 25,
  },
  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    alignItems: 'center',
  },
  modalIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  modalLabel: {
    fontSize: 13,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: '#473B3B',
  },

});
