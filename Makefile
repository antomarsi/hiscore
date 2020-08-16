DOCKER=docker-compose
YARN_SERVER=yarn workspace @hiscore/server
YARN_CLIENT=yarn workspace @hiscore/web

up:
	$(DOCKER) up -d

down:
	$(DOCKER) down

server-install:
	$(YARN_SERVER) install

client-install:
	$(YARN_CLIENT) install

install: server-install web-install

server-start:
	${YARN_SERVER} start

client-start:
	${YARN_CLIENT} start