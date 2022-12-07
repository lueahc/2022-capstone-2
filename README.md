# Inspected  

>`Node.js Server Repository` of application \<Inspected\>  
[Android App Repository](https://github.com/parkhyeongmo/Capstone_App)  
[YOLOv5 Server Repository](https://github.com/JunRepos/Capstone_Yolov5Server)  
  
## 프로젝트 개요
- 사진을 업로드하여 부품의 불량을 검출하는 `선박 및 해양플랜트 부품 품질 검사 앱`  
- 인공지능 모델을 활용했기 때문에 비전문가도 손쉽게 부품 검사 가능
- 선박 건조 작업 시 더 많은 부품의 검사를 수행해 안전을 확보하고 인적, 시간적 비용을 절감  

## 시스템 구조도
![구조도](https://user-images.githubusercontent.com/77429851/205581829-998e3e89-e21e-45b5-9eab-aa67d32b10a9.jpg)

***

## 개발 스택
- JavaScript, Node.js(Express Framework), MySQL  
- AWS EC2, RDS  

## API
[API Documentation](https://fork-potato-db6.notion.site/API-a26dd06e2d3646fa97338ee3f1b7bc38)  

## ERD
![diagram](https://user-images.githubusercontent.com/77429851/206067407-45f06dca-9a0d-4f02-b84f-b6ad0575e4fe.png)

## 역할 분담
|팀원|구현|
|------|-----------------|
|방채을|Client-Server 통신, 회원 인증 / 품질 검사 API, 배포|
|박설|DB 설계, 사용자 / 담당자 기능 API, 테스트|