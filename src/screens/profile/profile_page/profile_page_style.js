import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safearea: {
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
    textAlign: "center",
  },
  profileCard: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 70,
    height: 70,
    backgroundColor: "#ddd",
    borderRadius: 50,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    fontFamily: "Pretendard",
    lineHeight: 24, // 
  },
  profileId: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Pretendard",
    lineHeight: 20, // 
  },
  arrow: {
    fontSize: 20,
    color: "#999",
  },
  divider: {
    width: "90%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
  },
  menuList: {
    width: "90%",
    alignSelf: "center",
  },
  menuItem: {
    fontSize: 16,
    color: "#646464",
    marginBottom: 12,
    paddingLeft: 10,
    fontFamily: "Pretendard",
    lineHeight: 25, 
  },
  bottomNav: {
    height: '12%',
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
  navLabelActive: {
    color: '#473B3B',
    fontSize: 10,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 20, // ✨ 추가: 하단 네비 텍스트도 약간 여유
  },
  navLabel: {
    color: '#CCD0D7',
    fontSize: 10,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    lineHeight: 20, // ✨ 추가: 하단 네비 텍스트도 약간 여유
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
});

export default styles;
