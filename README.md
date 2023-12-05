## Yesterday's Trip


### - 프로젝트 기술 스택
- **BACK** : Spring Boot / Spring Security / MySQL / Redis / JWT / Doker / EC2 / S3
- **FRONT** : Vue3 / Vue-Router(4.x) / Pinia / Axios / event-source-polyfill / SCSS
![image](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/c2ab84ab-d52e-4750-8008-7697f4c78291)
<br><br><br>
<br><br><br>



## - 유즈 케이스
- **메인 유즈 케이스**
<img src="https://github.com/tjdwp0211/yesterday-trip/assets/95328434/97a5887c-e15b-4ded-97e7-3d3c28964391" width="480" height="240">

- **유저 유즈 케이스**
<img src="https://github.com/tjdwp0211/yesterday-trip/assets/95328434/bd28a218-ef12-4fcd-a8ce-9fd38923167e" width="480" height="240">

- **리뷰 유즈 케이스**
<img src="https://github.com/tjdwp0211/yesterday-trip/assets/95328434/b1107273-83c7-48b4-9cfd-43791f5032d8" width="480" height="240">


<br><br><br>
<br><br><br>




## 페이지 단위로 기능 확인하기

### - 메인 페이지
![메인페이지](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/93d398ef-582a-4c01-b4af-64d11638f2c2)
**로그인**과 **회원가입** 또는 **베스트 여행지를 추천**해주고, 헤더의 검색창을 통해서 지도 페이지로 이동할 수 있다. <br>

- **회원가입**<br>
회원 가입을 진행할 때 아래와 같은 절차를 검증해야 회원가입을 할 수 있다.
    1. **이메일 중복 검증**
    2. **해당 이메일로 발송된 인증 코드 검증**<br><br>

![회원가입](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/c4bac6b1-02a1-4078-a3cf-6165e34c64a8)
<br><br><br>

- **로그인**<br>

![로그인](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/a5487d3d-8e6f-40d9-a898-80b096fe5821)
<br><br><br>

- **임시 비밀번호 발급**<br>
그리고 만약 **비밀번호를 모른다면**, 이메일을 입력하고 해당 **이메일로 발송된 임시 비밀번호**로 로그인 할 수 있다.

![임시_비밀번호_발급](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/60c577df-bec4-4d35-89b2-2c7c7f89f8d1)
<br><br><br>
<br><br><br>

---
### - 마이 페이지
마이 페이지에서 정보를 조회할 수 있으며, **비밀번호 변경**을 할 수 있다.
![마이페이지](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/5838ecf9-b7ed-44f5-9bf4-d46a09da72f9)
- **비밀번호 변경**
![비밀번호_변경](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/ae2d385b-23d0-4869-b970-c8bc3705b7b9)
<br><br><br>
<br><br><br>

### - 지도 페이지
지도 페이지에서는 **'시도, 구군, 컨텐츠'타입**을 이용해 컨텐츠 조회나, **키워드**로 컨텐츠를 조회할 수 있다.
또한 조회한 컨텐츠에대해서 리뷰를 작성도 할 수 있다.
<img width="1258" alt="지도페이지" src="https://github.com/tjdwp0211/yesterday-trip/assets/95328434/b31aaa77-8872-4f1f-8c16-b832e2979883">

- **컨텐츠와 리뷰 조회** (feat. Marker K-Median Clustering)
![베스트여행지_클러스터링_리뷰](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/4a067a28-7f19-457c-983a-dfcd5e5cbb98)


- **리뷰 작성**<br>
중간에 선택한 **시도가 바뀌게 되면 새로 바뀐 시도의 구군을 선택**하게 한다.
또한 리뷰 작성 시, **DB에 아직 저장되지 않은 이미지**는 **프론트에서 임의 주소를 만들어 표출**하였다.
![리뷰_작성](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/54da74bb-94ab-49cb-95e8-ca43c2648a82)
<br><br><br>
<br><br><br>

---
### - 시도 팔로잉 페이지
**시도를 팔로잉** 할 수 있으며, **SSE(Server Sent Event)를 활용**해서 팔로잉한 시도의 **새 컨텐츠의 알람을 즉시 조회**할 수 있다.

- **시도 팔로잉**
![시도_팔로잉](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/b1878ddb-7f22-47f1-9f59-cc3664f0ae68)


- **관리자 관광지 추가 시 알림 즉시 조회** (feat. Server Sent Event)
![관리자_컨텐츠_추가_알람](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/491a0921-8354-4b05-ad4a-7ffb2d0396f1)
<br><br><br>
<br><br><br>

---
### 관리자 페이지
관리자란 시도를 관리하는 관리자로, **새로운 컨텐츠들을 추가**할 수 있는 페이지이며  위에서 보여드렸듯, **추가 즉시** 해당 시도를 팔로잉한 **일반 유저들은 알림**을 받게 된다.

- **시도 관리자가 등록하는 새로운 컨텐츠**
![관리자_관광지_등록](https://github.com/tjdwp0211/yesterday-trip/assets/95328434/38921db0-04fb-4976-ab03-01b3ca54f635)



