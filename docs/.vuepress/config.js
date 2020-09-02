module.exports = {
    title: 'Vivi \'s brain',
    description: 'Vivi \'s brain',
    plugins: ['@vuepress/back-to-top', '@vuepress/nprogress'],
    themeConfig: {
        logo: '/assets/img/logo.png',
        searchPlaceholder: 'Search...',
        smoothScroll: true,
        nextLinks: true,
        prevLinks: true,
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
            '/git/': [{
                title: 'Git',
                collapsable: true,
                children: ['alias', 'Commandes de base', 'liensutiles'],
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
                children: ['cmddebase'],
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
                children: ['Best Practices SF4','CMD','Doctrine','eventlistener', 'simplecache', 'symfony5'],
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
                    { text: 'ZSH', link: '/configs/zsh.md' },
                ]
            },
            {
                text: 'Divers',
                items: [
                    { text: 'Depannage', link: '/divers/depannage.md' },
                    { text: 'Emojis in VuePress', link: '/divers/emojisinvuepressmarkdown.md' },
                    { text: 'Liens Utiles', link: '/divers/liensutiles.md' },
                    { text: 'Mes raccourcis', link: '/divers/mesraccourcis.md' },
                    { text: 'Outils', link: '/divers/outils.md' },
                    { text: 'PhpStorm cheat sheet', link: '/divers/phpstormcheatsheet.md' },
                    { text: 'Veille', link: '/divers/veille' },
                    { text: 'Vim Config', link: '/divers/vimconfig.md' }

                ]
            },
            {
                text: 'Docker',
                items: [
                    { text: 'Commandes de base', link: '/docker/commandesdebases.md' },
                    { text: 'Mes commandes utiles', link: '/docker/mescommandesutiles.md' },
                ]
            },
            {
                text: 'Git',
                items: [
                    { text: 'Alias', link: '/git/alias.md' },
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
                text: 'Php',
                items: [
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
                    { text: 'Doctrine migration bundle', link: '/symfony/doctrinemigrationbundle.md' },
                    { text: 'Event Listener', link: '/symfony/eventlistener.md'},
                    { text: 'Simple Cache', link: '/symfony/simplecache.md'},
                    { text: 'Symfony5', link: '/symfony/symfony5.md' },
                    { text: 'Tricks', link: '/symfony/tricks.md' }
                ]
            },
            { text: ' Mon Github', link: 'https://github.com/VachetVirginie/vuePressTest' },
        ],
    },
};