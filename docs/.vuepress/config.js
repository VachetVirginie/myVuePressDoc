module.exports = {
    title: 'Vivi \'s brain',
    description: 'Vivi \'s brain',
    plugins: [
        '@vuepress/nprogress',
        '@vuepress/back-to-top',
        'reading-progress'
    ],
    readingDir: 'docs',
    themeConfig: {
        displayAllHeaders: true, 
        lastUpdated: 'Last Updated',
        logo: '/assets/img/logo.png',
        searchPlaceholder: 'Search...',
        smoothScroll: true,
        sidebar: {
            '/apiPlatform/': [{
                title: 'ApiPlatform',
                collapsable: true,
                children: ['Annotations'],
                displayAllHeaders: true
            }, ],
            '/aws/': [{
                title: 'Aws',
                collapsable: true,
                children: ['Base'],
                displayAllHeaders: true
            }, ],
            '/configs/': [{
                title: 'Configs',
                collapsable: true,
                children: ['Base'],
                displayAllHeaders: true
            }, ],
            '/divers/': [{
                title: 'Divers',
                collapsable: true,
                children: ['EmojisInVuePressMarkdown', 'LiensUtiles', 'MesRaccourcis', 'Outils', 'Veille', 'VimConfig'],
                displayAllHeaders: true
            }, ],
            '/docker/': [{
                title: 'Docker',
                collapsable: true,
                children: ['Commandes de base', 'Mes commandes utiles'],
                displayAllHeaders: true
            }, ],
            '/es6/': [{
                title: 'ES6',
                collapsable: true,
                children: ['Javascript forEach vs map','Reduce'],
                displayAllHeaders: true
            }, ],
            '/git/': [{
                title: 'Git',
                collapsable: true,
                children: ['alias', 'Commandes de base', 'liens utiles', 'Mes commandes utiles'],
                displayAllHeaders: true
            }, ],
            '/heroku/': [{
                title: 'Heroku',
                collapsable: true,
                children: ['sitestatic'],
                displayAllHeaders: true
            }, ],
            '/linux/': [{
                title: 'Linux',
                collapsable: true,
                children: ['cmddebase',"raccourcismint"],
                displayAllHeaders: true
            }, ],
            '/mac/': [{
                title: 'Mac',
                collapsable: true,
                children: ['raccourcis'],
                displayAllHeaders: true
            }, ],
            '/php/': [{
                title: 'Php',
                collapsable: true,
                children: ['php7'],
                displayAllHeaders: true
            }, ],
            '/securite/': [{
                title: 'Securite',
                collapsable: true,
                children: ['CIA', 'Canary Tokens', 'SIEM'],
                displayAllHeaders: true
            }, ],
            '/symfony/': [{
                title: 'Symfony',
                collapsable: true,
                children: ['Best Practices SF4','CMD','Doctrine','eventlistener', 'simplecache', 'symfony5', 'Recup entite'],
                displayAllHeaders: true
            }, ],
            '/vue/': [{
                title: 'Vue',
                collapsable: true,
                children: [],
                displayAllHeaders: true
            }, ],
            '/': [''], // fallback
        },
        nav: [
            { text: '', link: '/' },
            {
                text: 'ApiPlatform',
                items: [
                    { text: 'Annotations', link: '/apiPlatform/annotations.md' },
                ]
            },
            {
                text: 'Aws',
                items: [
                    { text: 'Base', link: '/aws/lambdaarticle.md' },
                    { text: 'Installe desinstalle cli', link: '/aws/installcli.md' },
                    { text: 'Resume cours OPC', link: '/aws/resumeopenclassroomcours.md' },

                ]
            },
            {
                text: 'Configs',
                items: [
                    { text: 'Eslintrc', link: '/configs/eslintrc.md' },
                    { text: 'Makefile', link: '/configs/makefile.md' },
                    { text: 'ZSH', link: '/configs/zsh.md' },
                ]
            },
            {
                text: 'Divers',
                items: [
                    { text: 'Convention de nommage', link: '/divers/conventiondenommage.md' },
                    { text: 'Depannage', link: '/divers/depannage.md' },
                    { text: 'Emojis in VuePress', link: '/divers/emojisinvuepressmarkdown.md' },
                    { text: 'Liens Utiles', link: '/divers/liensutiles.md' },
                    { text: 'Mes raccourcis', link: '/divers/mesraccourcis.md' },
                    { text: 'Outils', link: '/divers/outils.md' },
                    { text: 'PhpStorm cheat sheet', link: '/divers/phpstormcheatsheet.md' },
                    { text: 'Promises', link: '/divers/promises.md' },
                    { text: 'Veille', link: '/divers/veille' },
                    { text: 'Vim Config', link: '/divers/vimconfig.md' }

                ]
            },
            {
                text: 'Docker',
                items: [
                    { text: 'Commandes de base', link: '/docker/commandesdebases.md' },
                    { text: 'Logique conditionnelle dans Dockerfile', link: '/docker/conditionsdockerfile.md' },
                    { text: 'Mes commandes utiles', link: '/docker/mescommandesutiles.md' },
                ]
            },
            {
                text: 'ES6',
                items: [
                    { text: 'Javascript forEach vs map', link: '/es6/foreachandmap.md' },
                    { text: 'Javascript Reduce()', link: '/es6/reduce.md' },
                    { text: 'Object to array', link: '/es6/objecttoarray.md' }
                ]
            },
            {
                text: 'Git',
                items: [
                    { text: 'Alias', link: '/git/alias.md' },
                    { text: 'Bonnes Pratiques', link: '/git/bonnespratiques.md' },
                    { text: 'Commandes de base', link: '/git/gitcommandesdebase.md' },
                    { text: 'Liens utiles', link: '/git/liensutiles.md' },
                    { text: 'Mes CMD utiles', link: '/git/mescmdutiles.md' },

                ]
            },
            {
                text: 'Heroku',
                items: [
                    { text: 'Deployer un site static', link: '/heroku/sitestatic.md' },
                ]
            },
            {
                text: 'Linux',
                items: [
                    { text: 'CMD de base', link: '/linux/cmddebase.md' },
                    { text: 'CMD de base', link: '/linux/raccourcismint.md' },
                ]
            },
            {
                text: 'Mac',
                items: [
                    { text: 'Git', link: '/mac/git.md' },
                    { text: 'Ohmyzsh', link: '/mac/ohmyzsh.md' },
                    { text: 'Raccourcis', link: '/mac/raccourcis.md' },
                ]
            },
            {
                text: 'Php',
                items: [
                    { text: 'Opérateurs d incrémentation', link: '/php/operateurincrementation.md' },
                    { text: 'Resume livre php 7', link: '/php/resumelivre.md' },
                ]
            },
            {
                text: 'Securite',
                items: [
                    { text: 'Canary Tokens', link: '/securite/canarytokens.md' },
                    { text: 'CIA', link: '/securite/cia.md' },
                    { text: 'SIEM', link: '/securite/siem.md' }

                ]
            },
            {
                text: 'Symfony',
                items: [
                    { text: 'Best Practices SF4', link: '/symfony/bestpracticessf4.md' },
                    { text: 'Cmd', link: '/symfony/cmd.md' },
                    { text: 'Doctrine', link: '/symfony/doctrine.md' },
                    { text: 'DBAL Type Array', link: '/symfony/doctrinetypearray.md' },
                    { text: 'Doctrine migration bundle', link: '/symfony/doctrinemigrationbundle.md' },
                    { text: 'Entite recup', link: '/symfony/recuperersesentites.md' },
                    { text: 'Event Listener', link: '/symfony/eventlistener.md'},
                    { text: 'Projet Footix', link: '/symfony/footixproject.md'},
                    { text: 'Simple Cache', link: '/symfony/simplecache.md'},
                    { text: 'Symfony5', link: '/symfony/symfony5.md' },
                    { text: 'Tricks', link: '/symfony/tricks.md' }
                ]
            },
            {
                text: 'Vue',
                items: [
                    { text: 'CMD', link: '/vue/cmd.md' },
                    { text: 'Dependances liste', link: '/vue/vue3dep.md' },
                    { text: 'Config Eslint', link: '/vue/eslintconfig.md' },
                    { text: 'Upgrade to vue3', link: '/vue/vue3upgrade.md' },
                ]
            },
        ],
    },
};