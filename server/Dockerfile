# Build stage
FROM golang:1.20-rc-alpine3.17 AS builder
WORKDIR /app
COPY . .
RUN go build -o main main.go

#Run stage
FROM golang:1.20-rc-alpine3.17
WORKDIR /app
COPY --from=builder /app/main .
COPY app.env .

EXPOSE 8080
CMD [ "/app/main" ]