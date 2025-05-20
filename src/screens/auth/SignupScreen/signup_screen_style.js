// signup_screen_style.js
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#473B3B',
    marginBottom: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#705F5F',
    borderRadius: 5,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Noto Sans',
    fontWeight: '700',
    color: '#473B3B',
    marginBottom: 5,
  },
  input: {
    height: 40,
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
    backgroundColor: '#705F5F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Pretendard',
    fontWeight: '800',
  },
});
