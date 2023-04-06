# 🐿 야생동물 상생 플랫폼, 모이다 🦩

![moida_logo](./images/moida_logo.png)

# 1. 서비스 소개
## 📅 진행 기간
    - 2023.02.28 ~ 2023.04.07
   
## 🐾 서비스 개요
### 기획 배경
   
   
## 🖥 주요 기능
   
### 블록 체인을 활용한 기부  
> 1) 내용  
> 2) 내용
### 봉사
> 내용  
### 보상(NFT)
> 내용  


<br/><br/><br/>
# 2. 기술 스택
![프론트엔드 기술 스택](./images/front-block.png)
![백엔드 기술 스택](./images/backend-stack.png)
### Front-end
- **VSCode IDE** : v 1.77.0

- **React** : v 18.2.0
- **React-query** : v 4.28.0
- **React Web3** : v 1.9.0
- **Axios** : v 1.3.4
- **Styled-components** : v 5.3.8
- **Tailwind** : v 1.1.7
- **twin** : v 3.1.0
- **Node.js** : v 18.15.0

<br/><br/>
### Back-end
- **IntelliJ IDEA** : v 2022.03

- **Springboot** : v 3.0.4
- **JDK** : v 17.0.6
- **Spring Security** : v 3.0.4
- **JWT** : v 0.11.5
- **JPA** : v 3.0.4
- **Swagger** :  v 3.0.0
- **MariaDB** : v 10.11.2
- **Redis** : v 7.0.10
- **S3** : v 2.2.6

<br/><br/>
### Smart Contract(Blockchain, NFT)
- **Truffle** : v 5.8.1

- **Ganache** : v 7.7.7
- **Truffle Web3** : v 1.8.2
- **Solidity** : v 0.8.19
- **Metamask** : v 10.27.0
   
<br/><br/>
### CI/CD
- **AWS EC2**

- **AWS S3**
- **NGINX**
- **Docker**
- **Jenkins**
- **GitLab**

<br/><br/><br/>
## 3. 서비스 설계🛠
### ERD
![ERD](./images/DB_ERD.png)  
ERD 자세히 보기: [ERD LINK](https://www.erdcloud.com/d/qCT6HGbna3J9auCnr)
<br/><br/>

### 기능 명세서
![Requirements_document](./images/Requirements_document.jpg)
<br/><br/>

### API 설계
![API_document](./images/API_document.png)
<br/><br/>

### 시스템 아키텍처
![System_architecture](./images/System_architecture.png)
<br/><br/>

### 상세 디자인
![UI_design](./images/UI_design.png)

<br/><br/></br>
# 4. Blockchain & NFT 개념과 적용
## Blockchain
- 간단한 설명
### 서비스 내 Fauset 흐름
![Fauset_Flow](./images/Faucet_Flow.png)
### 서비스 내 블록체인 흐름
![Blockchain_Flow](./images/Blockchain_Flow.png)
### Blockchain 개념 정리 영상    
- 동영상 링크
<br/><br/>

## NFT
- NFT는 대체 불가능 토큰(Non-fungible token), 블록체인 기술을 이용하여 디지털 자산의 소유주를 증명하는 방식이다. 
블록체인의 트랜젝션 해시와 메타데이터를 통해서 소유주를 증명할 수 있다.
트랜젝션은 거래에 대한 기록을, 메타데이터는 NFT에 대해 고유한 원본성과 소유권을 나타내는데 사용된다.
- NFT의 고유한 속성 값을 담고있는 JSON 데이터를 메타데이터라고 한다. 
보통 블록체인이 가진 저장공간 제약 때문에 이미지를 외부 저장소에 저장하고, URI만 가져다 쓰는 오프체인 방식으로 많이 저장한다.
이때 저장된 메타데이터를 볼 수 있도록 하는 외부 링크를 token URI라고 말한다.
NFT를 저장하는 외부 저장소로 IPFS를 주로 사용한다.
위 서비스는 외부 저장소로 Pinata라는 클라우드 서비스를 사용한다.
### 서비스 내 NFT 흐름
![NFT_Flow](./images/NFT_Flow.png)  
### NFT 컬렉션
![NFT_collection](./images/NFT_collection.png)
### NFT 개념 정리 영상 
- 동영상 링크     
   
<br/><br/><br/>   
# 5. 서비스 화면 (프로젝트 결과)
### 기능별 or 흐름순 gif 및 설명 추가
   
<br/><br/><br/>
# 6. 협업 과정
### 협업 툴
- Git
- JIRA
- Notion
- MatterMost
<br/><br/>

### **Git 컨벤션**
### - Git branch
    - main  
    - develop  
    - feature     
### - feature 작성 방법
- feature/업무분야/기능설명  
- ex)  
    `feature/backend/user`  
    `feature/frontend/user`  
    `featrue/blockchain/donation`  
    `feature/nft/meanting`  
- <span style='background-color: #fff5b1'>MR 신청자 제외 같은 업무 분야에 있는 다른 사람이 MR 받기</span>
### - commit message 작성 방법   
ex) `git commit -m "Feat: 회원가입 기능 추가"`   
   
|커밋유형|의미|
|----|---------------|
|FEAT|새로운 기능 추가|
|FIX|버그 수정|
|DOCS|문서 수정|
|STYLE|코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우|
|Design|CSS 등 사용자 UI 디자인 변경|
|Comment|필요한 주석 추가 및 변경|
|RENAME|파일 혹은 폴더명 수정 및 이동|
|REMOVE|파일 삭제|   

<br/><br/>      
### **JIRA 컨벤션**
### - 작성 규칙
- Epic → Story → Task 
- 월요일 오전까지 그 주에 할 일들을 **백로그**에 **Task**로 모두 등록
- 매주 동일하게 등록해야할 사항은 **데일리 스크럼**
- ex)   
    > Epic : 프로젝트 기획   
    > Story : [기획]기획회의   
    > Task : [개인이모티콘][2주차]시장조사   
    ---
    > Epic : 프로젝트 개발   
    > Story : [개발]회원 관리 기능   
    > Task : [FE][개인이모티콘]로그인 페이지 구현 / [BE][개인이모티콘]로그인 기능 구현   

<br/><br/>

### Git Flow
![Git_Flow](./images/Git_Flow.gif)
<br/><br/>

### JIRA 번다운 차트
![JIRA_week1](./images/JIRA_week1.png)
![JIRA_week2](./images/JIRA_week2.png)
![JIRA_week3](./images/JIRA_week3.png)
![JIRA_week4](./images/JIRA_week4.png)
![JIRA_week5](./images/JIRA_week5.png)


<br/><br/><br/> 
# 7. 지꿈지꿈 팀 소개
### 팀원 소개 및 담당 역할
![팀원소개](./images/Team.png)
<br/><br/>

### 프로젝트 회고   
**문희주🐹**   
> 회고
   
**이수연🎀**
> 회고
   
**임세은🎅**
> 회고
     
**이은혁🕶️**
> 리액트를 이번 프로젝트에서 처음 사용해보았다. 처음에는 낯설어 사용이 어려웠지만, 사용할 수록 생각한데로 동작이 이루어져 편리했다. 기존의 vue3에서 느꼈던 답답함이 속시원하게 사라지는 느낌이랄까..?!
> 프로젝트가 하루 남은 시점에 matter.js라는 물리엔진을 발견하여 급하게 애니메이션 이벤트를 작업하는 중이지만 이게 잘 될지는 모르겠다.
> 처음으로 스크롤 양을 측정해서 키프레임 애니메이션을 구현해보았는데, 생각보다 결과가 잘 나와서 아주 만족스럽다. 물론 스크롤 이벤트를 쉽게 구현해주는 다른 여러 라이브러리가 존재하지만, 배움의  기회라 생각하고 직접 자바스크립트로 구현했다. 보여준 사람들마다 다들 칭찬해줘서 기뻤다.
> **아무튼 이번 프로젝트 성공이다.**
   
**정혜수💙**
> 회고
    
**한선영🌷** 
> 회고

<br/><br/><br/> 
# 8. 프로젝트 관련 링크 모음
- 링크 추가하기

