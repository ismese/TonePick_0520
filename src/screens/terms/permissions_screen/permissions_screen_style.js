import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 전체 화면 컨테이너
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // 헤더 영역 (이전 버튼 + 타이틀)
  header: {
    paddingTop: 60,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
  },

  // 이전 버튼 위치 조정
  backButton: {
    marginBottom: 20,
  },

  // 화면 타이틀
  title: {
    fontSize: 32,
    fontFamily: 'Inter',
    fontWeight: "700",
    color: "#473b3b",
    lineHeight: 40,
    marginBottom: 12,
  },

  // 타이틀 아래 선
  line: {
    height: 2,
    backgroundColor: "#705F5F",
    borderRadius: 2,
    width: "100%",
  },

  // 동의 박스 전체 컨테이너
  agreeBox: {
    marginTop: 32,
    marginHorizontal: 24,
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 18, // 항목 간 여백 조금 줄임
  },

  // 동의 항목 (checkbox + 텍스트)
  agreeItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  // 체크박스 텍스트 (아이콘 대용)
  checkbox: {
    fontSize: 22,
    marginRight: 12,
    color: "#705f5f",
  },

  // 항목 설명 텍스트
  agreeText: {
    fontSize: 14,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: "#473b3b",
  },

  // 하단 버튼 영역
  footer: {
    marginTop: "auto",
    paddingHorizontal: 24,
    alignItems: "center",
  },

  // 완료 버튼 스타일
  completeButton: {
    backgroundColor: "#705f5f",
    width: "100%",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  // 완료 버튼 텍스트
  completeButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontFamily: 'Pretendard',
    fontWeight: "800",
  },
});
