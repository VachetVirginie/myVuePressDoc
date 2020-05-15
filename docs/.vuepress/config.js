module.exports = {
    title: 'Waspy \'s brain',
    description: 'Waspy \'s brain',
    themeConfig: {
        sidebar: {
            '/divers/': [{
                title: 'Divers',
                collapsable: false,
                children: ['LiensUtiles', 'Emojis in VuePress markdown'],
            }, ],
            '/docker/': [{
                title: 'Docker',
                collapsable: false,
                children: ['Commandes de base'],
            }, ],
            '/git/': [{
                title: 'Git',
                collapsable: false,
                children: ['alias', 'Commandes de base'],
            }, ],
            '/symfony/': [{
                title: 'Symfony',
                collapsable: false,
                children: ['Best Practices SF4'],
            }, ],
            '/': [''], // fallback
        },
        nav: [
            { text: '', link: '/' },
            {
                text: 'Divers',
                items: [
                    { text: 'LiensUtiles', link: '/docs/divers/LiensUtiles.md' }
                ]
            },
            { text: 'Docker', link: '/docker/' },
            { text: 'Git', link: '/git/' },
            { text: 'Symfony', link: '/symfony/' },
            { text: 'Github', link: 'https://github.com/VachetVirginie/vuePressTest' },
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