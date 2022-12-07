# Who is Quartz?

> 주소: https://seokyoungyou.github.io/who-is-quartz

쌍둥이의 어렸을 때 사진으로 재미있는 퀴즈를 제공하는 웹사이트입니다. TypeScript & Recoil 사용 토이프로젝트 목적으로 제작하였습니다.

![개요](https://user-images.githubusercontent.com/79842380/198297380-91163fe0-496e-499b-af6b-2e8a8058a37f.gif)

개발기(블로그): https://velog.io/@skyu_dev/WIQ1-코로나-격리-기간에-쌍둥이-퀴즈-토이-프로젝트-만들기-TS-Recoil-연습하기

## 프로젝트 소개

- 무료한 명절 및 공휴일에 지인들에게 즐거움을 선사하기 위해 제작되었으며, quiz set을 업데이트 할 예정입니다.
- 두 명의 사람 중 저(Quartz)를 선택하여 정답을 확인합니다.
- 퀴즈 결과를 닉네임과 함께 등록할 수 있으며, 다른 사람들의 결과를 확인이 가능합니다.

## Library & Framework

- React
- Typescript
- Recoil: score state management
- React router dom v6
- Styled-Component
- Firebase for backend
- gh-pages for deploy

## Tools

- Git
  - Format of the commit message: https://gist.github.com/stephenparish/9941e89d80e2bc58a153

## 구현 완료된 기능

1. 퀴즈: 클릭하여 사진 선택

- 일관성 있는 UX를 위해 사진이 1 개인 경우와 2 개인 경우 모두 같은 UI를 사용합니다.
- 사용자가 사진을 선택하지 않으면 alert이 발생합니다.

![미선택시 alert3](https://user-images.githubusercontent.com/79842380/198295550-c98f832d-310d-4740-8936-9ba886f2fedb.gif)

2. 퀴즈 완료 후 닉네임 입력

- 닉네임을 입력하면 추가로 input을 받지 못하도록 설정하였습니다.

![이름입력](https://user-images.githubusercontent.com/79842380/198294418-c61708b0-f668-4509-95d0-9b3510817fd8.gif)

3. 다른 사람의 점수 확인

- 퀴즈를 풀지 않아도 점수 확인이 가능하도록 하였습니다.
- 점수 보드는 스크롤 뷰를 사용하였습니다.

4. Desktop/Mobile 브라우저 모두 지원

![점수확인기능](https://user-images.githubusercontent.com/79842380/198294433-33a6e851-8ad3-4e81-86d7-2f088fb753ca.gif)

## Version 2 추가 구현 목록

### 기능 목록

1. quiz2 data set(15 문제) 추가
2. Result screen 순위표(상위 10 명 출력) 추가

- 2.1 firebase db 추가
- 2.2 순위표 UI 구현

### 성능 개선

1. 이미지 렌더링 성능 개선

- lighthouse 사용
