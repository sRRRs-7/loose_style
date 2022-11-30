**select technology**

- frontend
  React - Next.js
  sass - scss
  react-query
  recoil
  material ui
  story-book
  jest
  eslint
  prettier

- API
  GraphQL
  codegen

- backend
  Go (gqlgen, dataloader, gin, sqlc, colly)

- database
  postgres (pgx/v4, dataloader, zerolog)
  redis

- infra
  AWS (EC2, ECS, ALB)
  terraform
  docker

- Saas
  github
  github actions
  circle CI

**architecture**

- MVC

  - frontend
    model:
    view:
    controller:

  - backend
    model: db, token, config, colly -> graph server gin handler
    view: resolver
    controller: graph server

**develop flow**

1. define
   EC
   information aggregation

2. design
   architecture
   technology

3. implement
   DOA
   design schema -> design server -> design DB -> design frontend -> cache -> scraping

4. review

5. test

6. run
