---
sidebar: auto
---
# Live

## Toutes Plateformes:

### Required
- Obs on the web server
- Select **English** as language in `OBS > Properties`.
- OBS websockets
- Download and install the version in `assets`,
- Configure it in OBS, in `Tools > WebSockets Server Settings`: Set port **4444** and password **NGTV@ngtv**.

### Scenes configuration
The user will be able to control OBS on `/live`, but first you need to configure scenes. You need to add a scene for each camera.

### Scheduled OBS reboot
Create a scheduled task on windows launching the script `script/windows/restartObs.bat` every night at three o'clock.

## Linux:

### OBS v25.0.3:

https://github.com/VachetVirginie/ressourcesPourTest/blob/main/Live/obs-studio_25.0.3%2Bdfsg1-2_amd64.deb

### OBS websocket 4.7:

https://github.com/VachetVirginie/ressourcesPourTest/blob/main/Live/obs-websocket_4.7.0-1_amd64.deb

### Parametres/stream

Service: Youtube/YouTube gaming (a modifier dans live.vue L111)

### Delete OBS: 
sudo apt-get remove --autoremove obs-studio

## Windows;
- [OBS](https://obsproject.com/) on the web server
- [OBS websockets](https://github.com/Palakis/obs-websocket/releases/tag/4.9.0)

## Firewall configuration
To allow any distant PC in the network to access the live, you have to open distant connection for OBS on ther web server.

 - Go to: 
   ````
   Control Panel / System and Security / Windows Defender Firewall / Allowed applications
   ````
 - Look for the OBS Studio application in the list, check the two boxes opposite and validate

⚠️ It is necessary to deactivate in the parameters of the cameras added on each scene 'Resume from the beginning when this source becomes active again'.
