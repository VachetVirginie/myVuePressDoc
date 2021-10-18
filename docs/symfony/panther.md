## Panther

1. make sure API_URL is properly defined in your .env, it should be like: 
 `API_URL=http://192.168.x.x:8000`
2. set PANTHER=1 in .env

3. In services.yaml comment:
````
            - '../src/Test/'
            - '../src/Command/TestsRunCommand.php'
````

3. Then you need to rebuild the php container:
````
docker-compose up -d --build php frontend
````
4. You can give it a try by running:
````
docker-compose exec php bin/console ngtv:test:run
````
5. checkout result in .docker/api/var/tests

<iframe width="560" height="315" src="https://www.youtube.com/embed/hJqQNKHvHBw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

