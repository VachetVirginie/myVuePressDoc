How to ?

first step:
add this code in your html page

```<script src="https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js"></script>
<script>
  function addDarkmodeWidget() {
    new Darkmode().showWidget();
  }
  window.addEventListener('load', addDarkmodeWidget);
</script>```

now open another script tag
place this inside it

```const options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // if you want the widget to be on the right then `right: '32px' and left to unset
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.5s' the time to fade in and out 
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // set to true if you want to load the site in the mode the user left it in
  label: '🌓', // the emoji you want for toggling light and dark mode
  autoMatchOsTheme: true // if you have enabled dark mode it would open darkmode
}

const darkmode = new Darkmode(options);
darkmode.showWidget();```