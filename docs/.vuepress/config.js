module.exports = {
    title: 'Vivi \'s brain',
    description: 'Vivi \'s brain',
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
                collapsable: false,
                children: ['Commandes de base', 'Mes commandes utiles'],
                displayAllHeaders: true
            }, ],
            '/git/': [{
                title: 'Git',
                collapsable: false,
                children: ['alias', 'Commandes de base', 'liensutiles'],
                displayAllHeaders: true
            }, ],
            '/heroku/': [{
                title: 'Heroku',
                collapsable: false,
                children: ['sitestatic'],
                displayAllHeaders: true
            }, ],
            '/linux/': [{
                title: 'Linux',
                collapsable: false,
                children: ['cmddebase'],
                displayAllHeaders: true
            }, ],
            '/securite/': [{
                title: 'Securite',
                collapsable: false,
                children: ['CIA', 'Canary Tokens', 'SIEM'],
                displayAllHeaders: true
            }, ],
            '/symfony/': [{
                title: 'Symfony',
                collapsable: false,
                children: ['Best Practices SF4', 'symfony5'],
                displayAllHeaders: true
            }, ],
            '/vue/': [{
                title: 'Vue',
                collapsable: false,
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
                    { text: 'Symfony5', link: '/symfony/symfony5.md' },
                    { text: 'Tricks', link: '/symfony/tricks.md' }
                ]
            },
            { text: ' Mon Github', link: 'https://github.com/VachetVirginie/vuePressTest' },
        ],
    },
    // '/fr/': {
    //     label: 'Français',
    //     selectText: 'Langues',
    //     sidebar: {
    //         '/fr/docker/': [{
    //             title: 'Mon chien - docker',
    //             collapsable: false,
    //             children: ['food', 'hobbies'],
    //         }, ],
    //         '/fr/symfony/': [{
    //             title: 'Mon chat - symfony',
    //             collapsable: false,
    //             children: ['food', 'hobbies'],
    //         }, ],
    //         '/fr/git/': [{
    //             title: 'Mon lapin - git',
    //             collapsable: false,
    //             children: ['food', 'hobbies'],
    //         }, ],
    //         '/': [''], // fallback
    //     },
    //     nav: [
    //         { text: 'docker', link: '/fr/docker/' },
    //         { text: 'symfony', link: '/fr/symfony/' },
    //         { text: 'git', link: '/fr/git/' },
    //         { text: 'Github', link: 'https://github.com/VachetVirginie/vuePressTest' },
    //     ],
    // },
};