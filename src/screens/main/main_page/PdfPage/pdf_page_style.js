import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter',
    fontWeight: "700",
    color: "#473B3B",
    lineHeight: 30,
    marginBottom: 5,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 13,
    fontFamily: 'Pretendard',
    fontWeight: "500",
    color: "#AEAEAE",
    lineHeight: 18,
    marginBottom: 8,
  },
  previewContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    marginTop: 20,
  },
  pdfPreview: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#ffffff",
  },
  completeButton: {
    backgroundColor: "#705F5F",
    width: "100%",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontFamily: 'Pretendard',
    fontWeight: "600",
  },
  input: {
	marginTop: 10,
	padding: 10,
	borderWidth: 1,
	borderColor: '#E0E0E0',
	borderRadius: 10,
	backgroundColor: '#fff',
	fontSize: 14,
	fontFamily: 'Pretendard',
  },
  
});
