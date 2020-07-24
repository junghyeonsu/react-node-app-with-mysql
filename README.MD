#### GIT :  https://github.com/junghyeonsu/react-node-app-with-mysql
#### BLOG : https://junghyeonsu.tistory.com/42
#### DOCKERHUB : https://hub.docker.com/repository/docker/jung660317/react-node-app-with-mysql

### Docker와 docker-compose가 설치가 되어있어야 합니다.
정말 정말 간단한 mysql과 연결한 react-node web app 입니다.



## 1. 우선 mysql image를 pull 한다.
링크 : *https://hub.docker.com/_/mysql*


## 2.  react-node-app-with-mysql Image를 pull 한다.
```
docker pull jung660317/react-node-app-with-mysql
```

## 3. mysql container에 접속해서 mysql 쉘에 접속한다. 
![image](https://user-images.githubusercontent.com/54893898/88367456-c3c66800-cdc6-11ea-9320-38a9c51e94e4.png)

```
docker exec -it <mysql container name> /bin/bash

mysql -u root -p
```

#### password : admin


## 4. "db" 이름의 데이터베이스, "table1" 이름의 테이블을 생성한다.
**테이블의 필드의 이름은 아무거나 상관없지만 하나의 필드만 적용해야 합니다**<br>
### **데이터베이스 명, 테이블 명은 고정해야 합니다.**

![image](https://user-images.githubusercontent.com/54893898/88367679-4fd88f80-cdc7-11ea-847b-c50c9df54b47.png)

```
create database db;

use db;

create table table1(name char(20));
```

## 5. docker-compose.yml 파일 작성
```
version: '3.1'

services:
  mysql:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    container_name: mysql
    network_mode: host
    environment:
      MYSQL_ROOT_PASSWORD: admin

  adminer:
    image: adminer
    restart: always
    network_mode: host
    ports:
      - 8080:8080

  react-node-app-with-mysql:
    image: jung660317/react-node-app-with-mysql
    container_name: react-node-app
    restart: always
    ports:
      - 3000:3000
    network_mode: host
```

## 6. docker-compose 실행

```
docker-compose up -d --build
```

![image](https://user-images.githubusercontent.com/54893898/88368059-2ff59b80-cdc8-11ea-8b38-50c9ec910a47.png)

## 7 localhost:3000에 접속

http://localhost:3000/

![image](https://user-images.githubusercontent.com/54893898/88368148-66331b00-cdc8-11ea-8930-76ebedccda9b.png)

정상 동작 확인

---
### 삽입 버튼
input 창에 입력한 데이터를 넣어줍니다.

### 데이터 보기 버튼
mysql 데이터베이스에 들어간 데이터를 보여줍니다.

### 모든 데이터 삭제 버튼
mysql 데이터베이스에 들어간 데이터를 모두 삭제합니다.
