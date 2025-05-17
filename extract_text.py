import fitz  # PyMuPDF
import os

# 🔽 iOS 앱 내부 경로 그대로 붙여넣기
pdf_path = "file:///var/mobile/Containers/Data/Application/969B1062-6DA6-467A-929A-5098A71FDFA9/Library/Caches/ExponentExperienceData/@anonymous/exporoute-cefc898a-12d5-4d01-8cdc-623b5a7594fe/DocumentPicker/FD9B708F-E036-4D92-8D7D-4564BACF5D84.pdf"

# ✅ 경로에서 "file://" 제거해서 실제 경로로 변환
real_path = pdf_path.replace("file://", "")

# 🔍 경로 확인
print("📁 열려는 PDF 파일 경로:", real_path)

# ✅ PDF 열기 및 텍스트 추출
try:
    doc = fitz.open(real_path)
    for i, page in enumerate(doc):
        text = page.get_text()
        print(f"\n📄 Page {i+1} ------------------\n{text}")
except Exception as e:
    print("❌ PDF 열기 실패:", e)
