FROM node:25.1.0

ADD entrypoint.sh /var/docker/

WORKDIR /app

ENTRYPOINT [ "bash", "/var/docker/entrypoint.sh" ]

CMD [ "npm", "run", "dev" ]