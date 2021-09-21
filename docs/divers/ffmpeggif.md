 ## gif animé

````
ffmpeg -framerate 24 -i "%06d.png" -filter_complex "[0:v] fps=24,scale=w=640:h=-1,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1" -f gif output.gif
````

## Convertir video to gif 

````
ffmpeg -i input.flv -ss 00:00:00.000 -pix_fmt rgb24 -r 10 -s 320x240 -t 00:00:10.000 output.gif
````
```
ffmpeg -ss 30 -t 3 -i input.mp4 -vf "fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 output.gif

```

-   This example will skip the first 30 seconds (`-ss 30`) of the input and create a 3 second output (`-t 3`).
-   [fps](https://ffmpeg.org/ffmpeg-filters.html#fps) filter sets the frame rate. A rate of 10 frames per second is used in the example.
-   [scale](https://ffmpeg.org/ffmpeg-filters.html#scale) filter will resize the output to 320 pixels wide and automatically determine the height while preserving the aspect ratio. The lanczos [scaling algorithm](https://ffmpeg.org/ffmpeg-scaler.html) is used in this example.
-   [palettegen](https://ffmpeg.org/ffmpeg-filters.html#palettegen) and [paletteuse](https://ffmpeg.org/ffmpeg-filters.html#paletteuse) filters will generate and use a custom palette generated from your input. These filters have many options, so refer to the links for a list of all available options and values. Also see the **Advanced options** section below.
-   [split](https://ffmpeg.org/ffmpeg-filters.html#split) filter will allow everything to be done in one command and avoids having to create a temporary PNG file of the palette.
-   Control looping with `-loop` output option but the values are confusing. A value of `0` is infinite looping, `-1` is no looping, and `1` will loop once meaning it will play twice. So a value of 10 will cause the GIF to play 11 times.