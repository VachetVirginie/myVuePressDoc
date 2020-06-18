module.exports = {
    title: 'Waspy \'s brain',
    description: 'Waspy \'s brain',
    themeConfig: {
        sidebar: {
            '/divers/': [{
                title: 'Divers',
                collapsable: false,
                children: ['LiensUtiles', 'EmojisInVuePressMarkdown', 'MesRaccourcis', 'VimConfig'],
            }, ],
            '/docker/': [{
                title: 'Docker',
                collapsable: false,
                children: ['Commandes de base'],
            }, ],
            '/git/': [{
                title: 'Git',
                collapsable: false,
                children: ['alias', 'Commandes de base', 'liensutiles'],
            }, ],
            '/heroku/': [{
                title: 'Heroku',
                collapsable: false,
                children: ['sitestatic'],
            }, ],
            '/securite/': [{
                title: 'Securite',
                collapsable: false,
                children: ['CIA','Canary Tokens','SIEM'],
            }, ],
            '/symfony/': [{
                title: 'Symfony',
                collapsable: false,
                children: ['Best Practices SF4', 'symfony5'],
            }, ],
            '/': [''], // fallback
        },
        nav: [
            { text: '', link: '/' },
            {
                text: 'Divers',
                items: [
                    { text: 'Liens Utiles', link: '/divers/liensutiles.md' },
                    { text: 'Emojis in VuePress', link: '/divers/emojisinvuepressmarkdown.md' },
                    { text: 'Mes raccourcis', link: '/divers/mesraccourcis.md' },
                    { text: 'Vim Config', link: '/divers/vimconfig.md' }

                ]
            },
            {
                text: 'Docker',
                items: [
                    { text: 'Commandes de base', link: '/docker/commandesdebases.md' },
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
                text: 'Securite',
                items: [
                    { text: 'CIA', link: '/securite/cia.md' },
                    { text: 'Canary Tokens', link: '/securite/canarytokens.md' },
                    { text: 'SIEM', link: '/securite/siem.md' }

                ]
            },
            {
                text: 'Symfony',
                items: [
                    { text: 'Best Practices SF4', link: '/symfony/bestpracticessf4.md' },
                    { text: 'Symfony5', link: '/symfony/symfony5.md' }
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