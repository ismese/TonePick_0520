import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 60, // ✅ 버튼 여백 확보
    backgroundColor: 'white',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    fontWeight: '700',
    color: '#473B3B',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: '#705F5F',
    borderRadius: 5,
    marginBottom: 30,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Pretendard',
    fontWeight: '300',
    color: '#473B3B',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#705F5F',
    borderRadius: 15,
    paddingHorizontal: 21,
    fontSize: 12,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'white',
  },
  submitButton: {
    height: 40,
    width: "100%",
    backgroundColor: '#705F5F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 260, 
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Pretendard',
    fontWeight: '600',
  },
});
