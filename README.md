## 폴더 구조

```
.
├── api // rest api 서버
├── proxy
│ ├── Dockerfile
│ └── nginx.conf // nginx 기본 설정 파일
└── rdbms
│ ├── config
│ │ └── my.cnf // 기본 설정 파일
│ └── initdb
│ │ ├── create_database.sql // dobby database 생성 query
├── .gitignore
├── README.md
├── docker-compose.dev.yml // development docker compose 설정
├── docker-compose.prod.yml // production docker compose 설정
└── docker-compose.yml // 기본 docker compose 설정
```

## 명령어

- 실행 명령어({} 안의 값은 선택, () 안의 값은 옵션 값입니다.)

  ```
  docker-compose -f docker-compose.yml -f docker-compose.{dev, prod}.yml up -d (--build) && docker volume prune -f (&& docker image prune -f)
  ```

- 종료 명령어

  ```
  docker-compose down
  ```
