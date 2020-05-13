module.exports = {
    title: 'Waspy \'s brain',
    description: 'Waspy \'s brain',
    // locales: {
    //     '/': {
    //         lang: 'en-US',
    //         title: 'Waspy \'s brain',
    //         description: 'How to take care of my pets',
    //     },
    //     '/fr/': {
    //         lang: 'fr-FR',
    //         title: 'Waspy \'s brain',
    //         description: 'Comment s\'occuper de mes animaux',
    //     },
    // },
    themeConfig: {
        docsDir: 'docs',
        locales: {
            '/': {
                label: 'English',
                //  selectText: 'Languages',
                sidebar: {
                    '/docker/': [{
                        title: 'Docker',
                        collapsable: false,
                        children: ['Commandes de base'],
                    }, ],
                    '/symfony/': [{
                        title: 'Symfony',
                        collapsable: false,
                        children: ['Best Practices SF4'],
                    }, ],
                    '/git/': [{
                        title: 'Git',
                        collapsable: false,
                        children: ['alias', 'Commandes de base'],
                    }, ],
                    '/': [''], // fallback
                },
                nav: [
                    { text: '', link: '/' },
                    { text: 'Docker', link: '/docker/' },
                    { text: 'Symfony', link: '/symfony/' },
                    { text: 'Git', link: '/git/' },
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
        },
    },
};