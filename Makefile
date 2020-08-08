DOCKER=docker-compose
DOCKER_EXEC_API=$(DOCKER) exec api
DOCKER_EXEC_WEB=$(DOCKER) exec web

up:
	$(DOCKER) up -d

down:
	$(DOCKER) down

server-install:
	$(DOCKER_EXEC_API) yarn

client-install:
	$(DOCKER_EXEC_WEB) yarn

install: server-install web-install

server-bash:
	$(DOCKER_EXEC_API) ash

client-bash:
	$(DOCKER_EXEC_WEB) ash

server-start:
	$(DOCKER_EXEC_API) yarn start

client-start:
	$(DOCKER_EXEC_WEB) yarn start