---
sidebar: auto
---
# Installation Git: 

How to Install Git on Mac
-------------------------

Open a terminal and type

```
$ brew install git

```

This will install Git on your system. To confirm the installation, type

```
$ git --version

```

This will print the version of Git installed on your machine.

How to generate SSH key for GitHub authorization
------------------------------------------------

1.  Open a terminal
2.  Go to your home directory by typing `cd ~/`
3.  Type the following command `ssh-keygen -t rsa`

    -   This will prompt you to enter a filename to store the key
    -   Just press enter to accept the default filename (/Users/you/.ssh/id_rsa)
    -   Then it will ask you to create a passphrase. This is optional, either create a passphrase or press enter for no passphrase
4.  When you press enter, two files will be created
    -   `~/.ssh/id_rsa`
    -   `~/.ssh/id_rsa.pub`
5.  Your public key is stored in the file ending with .pub, i.e. `~/.ssh/id_rsa.pub`

How to access and copy public SSH key
-------------------------------------

In order to authenticate yourself and your device with GitHub, you need to upload your public SSH key which you generated above to your GitHub account.

**Copy public SSH key**

Open a terminal and type

```
$ pbcopy < ~/.ssh/id_rsa.pub

```

This will copy the contents of the id_rsa.pub file to your clipboard.


How to upload your public SSH key to GitHub
-------------------------------------------

1.  Once you have copied your public SSH key, login to your GitHub account and go to
2.  <https://github.com/settings/profile>
3.  On the left-hand side menu, you will see a link "SSH and GPG keys"
4.  Click on that link which will take you to a page where you can enter your public SSH key that you copied earlier.
5.  Click the button which says 'New SSH key'
6.  Then enter a title name - can be anything, e.g. newMac
7.  Paste the public SSH key in the key textbox
8.  Click "Add SSH key"