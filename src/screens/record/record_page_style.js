import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f7f8f9",
  },
  header: {
    width: "100%",
    height: 59,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#473b3b",
  },
  titleSection: {
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#473b3b",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#757575",
  },
  recordList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 30,
  },
  recordItem: {
    width: "90%",
    height: 67,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccd0d7",
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  recordText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#473b3b",
  },
  // ⭐ 추가한 부분 (파란색 버튼)
  playButton: {
    width: 30,
    height: 30,
    backgroundColor: "#2193f2",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  progressSection: {
    width: "90%",
    height: 59,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  // 추가
progressRow: {
	flexDirection: "row",  // 가로로 나란히!
	alignItems: "center",  // 세로 중앙 정렬
	width: "80%",
  },
  progressText: {
	fontSize: 10,
	fontWeight: "600",
	color: "#000",
	marginRight: 8, 
  },
  progressBarBackground: {
	flex: 1,   
	height: 4,
	backgroundColor: "rgba(120, 120, 128, 0.16)",
	borderRadius: 2,
	overflow: "hidden",
  },
  progressBarFill: {
	width: "18%",
	height: "100%",
	backgroundColor: "#007aff",
	borderRadius: 2,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  recordButtonLarge: {
    width: 286,
    height: 40,
    backgroundColor: "#705F5F",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  recordButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  safeArea: {
	flex: 1,
	backgroundColor: "#f7f8f9",
  },
});
