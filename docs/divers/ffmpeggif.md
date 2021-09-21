 ## gif animé

````
ffmpeg -framerate 24 -i "%06d.png" -filter_complex "[0:v] fps=24,scale=w=640:h=-1,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1" -f gif output.gif
````