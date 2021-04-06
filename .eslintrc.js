module.exports = {
    root: true,
    extends: ['../../.eslintrc', 'plugin:react/recommended'],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        babelOptions: {
            configFile: `${__dirname}/.babelrc`,
        },
    },
    plugins: ['react'],
    rules: {
        'no-empty': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
};
