---
sidebar: auto
---
# Setup

## Installer et désinstaller l'AWS CLI

### Installer l'AWS CLI version 1 à l'aide du programme d'installation fourni avec `sudo`

Les étapes ci-dessous vous permettent d'installer l'AWS CLI version 1 à partir de la ligne de commande sur n'importe quelle build de Linux ou macOS.

Voici un résumé des commandes d'installation présentées ci-après que vous pouvez couper et coller pour les exécuter sous la forme d'un ensemble unique de commandes.

``curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws``

Exécutez les étapes suivantes à partir de la ligne de commande pour installer l'AWS CLI version 1 à l'aide du programme d'installation fourni.

**Pour installer l'AWS CLI version 1 à l'aide du programme d'installation fourni**

1.  Téléchargez le programme d'installation AWS CLI version 1 fourni à l'aide de l'une des méthodes suivantes.

    -   Procédez au téléchargement à l'aide de la commande `curl`.

        ``$` `curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"``

    -   Procédez au téléchargement via le lien direct : <https://s3.amazonaws.com/aws-cli/awscli-bundle.zip>

2.  Extrayez les fichiers du package. Si vous ne disposez pas de `unzip` pour extraire les fichiers, utilisez le gestionnaire de package intégré de votre distribution Linux pour l'installer.

    ``$` `unzip awscli-bundle.zip``

3.  Exécutez le programme d'installation. Le programme d'installation installe l'AWS CLI sous `/usr/local/aws` et crée le lien symbolique `aws` dans le répertoire `/usr/local/bin`. L'utilisation de l'option `-b` pour créer un lien symbolique évite d'avoir à spécifier le répertoire d'installation dans la variable utilisateur `$PATH`. Cela doit permettre à tous les utilisateurs d'appeler l'AWS CLI en entrant `aws` depuis n'importe quel répertoire.

    ``$` `sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws``

    Par défaut, le script d'installation s'exécute sous la version système par défaut de Python. Si vous avez installé une autre version de Python et souhaitez utiliser celle-ci pour installer l'AWS CLI, exécutez le script d'installation avec cette version dans le chemin d'accès absolu au fichier exécutable Python, comme suit.

    ``$` `sudo `/usr/local/bin/python3.7` awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws``

4.  Vérifiez que l'AWS CLI est installée correctement.

    ``$` `aws --version`
    `aws-cli/1.18.83 Python/3.7.4 Linux/4.14.133-113.105.amzn2.x86_64 botocore/1.13``
    
 ### Désinstaller le programme d'installation AWS CLI version 1 fourni
    
    Le programme d'installation fourni ne place rien en dehors du répertoire d'installation, à l'exception du lien symbolique facultatif, de sorte que la désinstallation est aussi simple que la suppression de ces deux éléments.
    
    ``$` `sudo rm -rf /usr/local/aws`
    `$` `sudo rm /usr/local/bin/aws``   
    
 ## #Installing the Serverless Framework
Install the Serverless Framework via npm which was already installed when you installed Node.js.
    
Open up a terminal and type:

    npm install -g serverless to install Serverless.
    npm install -g serverless
    
Once the installation process is done you can verify that Serverless is installed successfully by running the following command in your terminal:
    
    serverless
    
To see which version of serverless you have installed run:
    
    serverless --version   