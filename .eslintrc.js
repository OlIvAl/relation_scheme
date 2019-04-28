module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        // 'sonarjs'
    ],
    extends:  [
        // 'react-app',
        'eslint:recommended',
        'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
        // 'plugin:sonarjs/recommended'
    ],
    parserOptions:  {
        ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
        sourceType:  'module',  // Allows for the use of imports
        ecmaFeatures:  {
            jsx:  true,  // Allows for the parsing of JSX
        },
    },
    rules:  {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "indent": "off",
        "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/interface-name-prefix": ['error', 'always'],
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/array-type": ["error", "array"],
        "@typescript-eslint/no-empty-interface": 0,
        "react/prop-types": 0,
        "react/display-name": 0
    },
    settings:  {
        react:  {
            version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
};