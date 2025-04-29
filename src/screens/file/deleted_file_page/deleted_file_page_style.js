// deleted_file_page_style.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE9E9',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    left: 28,
    top: 22,
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
    paddingHorizontal: 20,
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
    fontFamily: 'Pretendard-Regular',
    lineHeight: 16.8,
  },
});
