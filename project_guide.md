📂 Project: Our 730 Days (Developer Guide)

이 문서는 '2주년 기념 이벤트 페이지' 개발 및 배포를 위한 가이드라인입니다.
백엔드 개발자의 관점에서 **데이터(Config)**와 **리소스(Assets)**를 효율적으로 관리하는 방법을 설명합니다.

1. 🏗️ 프로젝트 폴더 구조 (Directory Structure)

가장 먼저 IDE(Antigravity)의 탐색기에서 아래와 같이 폴더를 만들어주세요.
이미지 경로(src)가 코드와 일치해야 엑박이 뜨지 않습니다.

lovely-event/ (루트 폴더)
│
├── index.html # 메인 소스 코드 (작성 완료된 파일)
│
└── img/ # [폴더 생성 필요] 이미지 리소스 폴더
├── 01_start/ # 1. 첫 만남 테마
│ ├── main.jpg # 대표 사진
│ ├── 1.jpg # 상세 사진 1
│ └── 2.jpg # 상세 사진 2
│
├── 02_cherry/ # 2. 벚꽃 데이트 테마
│ ├── main.jpg
│ └── ...
│
├── 03_summer/ # 3. 여름 휴가 테마
│ ├── main.jpg
│ └── ...
│
├── 04_xmas/ # 4. 크리스마스 테마
│ ├── main.jpg
│ └── ...
│
└── final/ # 5. 마지막 하이라이트
└── main.jpg # 2주년 기념 사진

2. ⚙️ 설정 관리 (Configuration)

index.html 파일 하단에 있는 <script> 태그 내 CONFIG 객체만 수정하면 됩니다.
하드코딩을 피하고, 이곳에서 데이터를 통합 관리합니다.

🔑 주요 설정 변수

변수명

설명

예시

startDate

로그인 비밀번호 (기념일)

"20240118"

memories

타임라인 데이터 배열

(아래 코드 참고)

finalMemory

마지막 엔딩 카드 데이터

{ title: "...", img: "..." }

letter

편지 내용 (HTML 태그 허용)

사랑해<br>고마워

📸 이미지 경로 연결 가이드

CONFIG.memories 배열 안의 images 경로를 실제 파일명과 맞춰주세요.

// 예시 코드
{
date: "2024.01.18",
title: "설레는 첫 시작",
images: [
"./img/01_start/main.jpg", // 대표 사진
"./img/01_start/1.jpg", // 추가 사진 1
"./img/01_start/2.jpg" // 추가 사진 2
],
desc: "..."
}

3. 🎨 이미지 최적화 (Optimization Tip)

여자친구는 모바일로 접속할 확률이 99%입니다.
원본 사진(3MB~)을 그대로 넣으면 로딩이 매우 느려져 감동이 깨질 수 있습니다.

압축 필수: TinyPNG 같은 사이트에서 용량을 줄여주세요. (목표: 장당 500KB 이하)

비율 통일: 필수는 아니지만, 가로/세로 비율이 비슷한 사진끼리 묶으면 모달 슬라이드가 더 예쁩니다.

4. 🚀 실행 및 테스트 (How to Run)

로컬 테스트 (IDE)

index.html 파일을 엽니다.

IDE의 "Live Server" 또는 "Preview" 기능을 실행합니다.

브라우저 주소창에 localhost:3000 등이 뜨면 성공.

로그인 테스트: 20240118 입력 후 엔터.

모바일 뷰 확인: 개발자 도구(F12) -> 모바일 아이콘 클릭 -> iPhone 12/14 Pro 선택 후 레이아웃 확인.

5. ☁️ 배포 (Deployment)

완성된 페이지를 여자친구에게 링크로 보내주려면 배포가 필요합니다.
Vercel을 추천합니다. (무료, HTTPS 지원, 초간단)

Vercel 회원가입.

Add New Project 클릭.

작업한 GitHub 리포지토리를 연결하거나, index.html과 img 폴더를 포함한 전체 폴더를 터미널(Vercel CLI)로 배포.

생성된 도메인(예: our-730-days.vercel.app)을 카톡으로 전송!

✅ 최종 체크리스트 (Checklist)

[ ] img 폴더 구조를 만들고 사진을 모두 넣었는가?

[ ] CONFIG 객체 내의 이미지 경로가 실제 파일명과 일치하는가?

[ ] 편지 내용(letter)에 오타는 없는가? (진심 100% 담기)

[ ] 모바일 화면에서 글자가 너무 작거나 사진이 깨지지 않는가?

[ ] 배경음악(BGM)은 브라우저 정책상 자동 재생이 안 되므로, "음악 틀고 봐줘!" 라고 미리 말해두기.

Good Luck, Developer Boyfriend! 👨‍💻❤️
