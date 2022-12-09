build:
	docker build . -t next-app

run:
	docker run --name next-app -p 3000:3000 --user 1001 -d next-app

exec:
	docker exec -it next-app sh

images:
	docker images

rm:
	docker rmi $(id) -f

ps:
	doker ps -a


PHONY: build, run, images, rm, ps