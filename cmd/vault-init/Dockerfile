FROM golang:1.13.1-stretch

ENV \
 GOARCH="amd64" \
 PATH="$PATH:/go/bin" \
 GO111MODULE=on

WORKDIR /go/src/github.com/stevenaldinger/vault-init

COPY go.mod go.mod

RUN go version \
 && go mod download \
 && go mod verify

COPY . .

RUN env GOOS=linux GOARCH=amd64 go build -o vault-init

CMD ./vault-init
