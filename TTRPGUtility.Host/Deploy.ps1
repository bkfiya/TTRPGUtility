#must be authenticated with doctl first and have your context correct.
docker build . --tag ttrpgutility
doctl registry login
docker tag ttrpgutility registry.digitalocean.com/bkfire/ttrpgutility
docker push registry.digitalocean.com/bkfire/ttrpgutility
doctl apps create-deployment $APPID --force-rebuild