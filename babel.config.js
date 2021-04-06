module.exports = {
    env: {
        development: {
            presets: [
                'next/babel',
                '@emotion/babel-preset-css-prop',
                ['@babel/preset-env', { targets: { node: 'current' } }],
            ],
            plugins: [
                ['@emotion'],
                [
                    'module-resolver',
                    {
                        root: ['./'],
                        alias: {
                            '@components': './components',
                            '@utils': './utils',
                            '@reducers': './reducers',
                        },
                    },
                ],
            ],
        },
        production: {
            presets: ['next/babel', '@emotion/babel-preset-css-prop'],
            plugins: [
                ['@emotion'],
                [
                    'module-resolver',
                    {
                        root: ['./'],
                        alias: {
                            '@components': './components',
                            '@utils': './utils',
                            '@reducers': './reducers',
                        },
                    },
                ],
            ],
        },
        test: {
            presets: ['next/babel', '@emotion/babel-preset-css-prop'],
            plugins: [
                ['@emotion'],
                [
                    'module-resolver',
                    {
                        root: ['./'],
                        alias: {
                            '@components': './components',
                            '@utils': './utils',
                            '@reducers': './reducers',
                        },
                    },
                ],
            ],
        },
    },
};
