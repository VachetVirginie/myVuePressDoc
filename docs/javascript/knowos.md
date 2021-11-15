### Detecting operating system on the client machine.

````
const OSName="Unknown OS";
if (navigator.appVersion.includes("Win")) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")) OSName="Linux";

document.write('Your OS: '+OSName);
````