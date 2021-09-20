## Panther

<iframe width="560" height="315" src="https://www.youtube.com/embed/hJqQNKHvHBw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


    1. make sure API_URL is properly defined in your .env, it should be like 1. API_URL=http://192.168.x.x:8000
    1. set PANTHER=1 in .env
    1. Then you need to rebuild the php container:
    ````
     docker-compose up -d --build php frontend
     ````
    1. You can give it a try by running:
    ````
     docker-compose exec php bin/console ngtv:test:run
     ````
    1. checkout result in .docker/api/var/tests
