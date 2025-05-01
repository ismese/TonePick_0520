import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    paddingTop: 60, // ← 좀 더 위로 밀기 위해 줄임
  },

  header: {
    marginBottom: 1,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Inter',
    fontWeight: "700",
    color: "#473B3B",
    lineHeight: 36,
    marginBottom: 8,
  },

  subTitle: {
    fontSize: 13,
    fontFamily: 'Pretendard',
    fontWeight: "500",
    color: "#AEAEAE",
    lineHeight: 18,
  },

  permissionList: {
    marginTop: 24,
    gap: 16,
  },

  permissionItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderColor: "#E5E5E5",
  },

  permissionTitle: {
    fontSize: 15,
    fontFamily: 'Pretendard',
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },

  permissionDesc: {
    fontSize: 13,
    fontFamily: 'Pretendard',
    color: "#777777",
    lineHeight: 18,
  },

  footer: {
    marginTop: 'auto',
    alignItems: "center",
  },

  completeButton: {
    backgroundColor: "#705F5F",
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  completeButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontFamily: 'Pretendard',
    fontWeight: "800",
  },

   completeButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontFamily: 'Pretendard',
    fontWeight: "800",
  },


  permissionRow: {
    flexDirection: 'row',          
    alignItems: 'flex-start',      
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginTop: 4,
    resizeMode: 'contain',
  },
});
