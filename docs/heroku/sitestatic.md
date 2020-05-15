---
sidebar: auto
---
# sitestatic

1.  Head to the root directory of your project that contains index.html (the main HTML page).
2.  In this directory, run `touch composer.json` to create a file: composer.json.
3.  Within the file, add the following line: `{}`
4.  In the same directory, run `touch index.php` to create a file: index.php.
5.  Within the file, add the following line: `<?php include_once("index.html"); ?>`
6.  Now, commit and push these two new files to your repository. You can also use the Heroku command `git push heroku master` . Wait for the automatic deployment to work its magic.
