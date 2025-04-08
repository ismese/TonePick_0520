import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    paddingTop: '50%',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    backgroundColor:"white",
  },
  logo: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 43,
    fontWeight: '700',
    color: '#5D4D4D',
    marginBottom: 56,
  },
  input: {
    width: 280,
    height: 44,
    borderColor: '#705F5F',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 14,
  },
  loginButton: {
    width: 280,
    height: 44,
    backgroundColor: '#705F5F',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontFamily:'Pretendard-Bold',
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomLinks: {
    flexDirection: 'row',
    marginTop: 35,
    gap: 30,
  },
  //ID, PW찾기, 회원가입
  linkText: {
    fontSize: 13,
    color: '#AEAEAE',
  },
  // |
  divider: {
    color: '#AEAEAE',
    fontSize: 13,
  },
  socialLoginText: {
    fontFamily:'Pretendard-Bold',
    fontSize: 15,
    color: '#5D4D4D',
    marginTop: 76,
    marginBottom: 25,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 47,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
});
