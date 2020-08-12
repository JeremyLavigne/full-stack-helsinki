module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "commonjs": true,
        "es2020": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        'eqeqeq': 'error',
        'no-console': 0,
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'semi': [
            'error',
            'never'
        ]
    }
};
