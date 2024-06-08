module.exports = [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                // Add es2021 globals
                BigInt: 'readonly',
                BigInt64Array: 'readonly',
                BigUint64Array: 'readonly',
                globalThis: 'readonly',
                // Add node globals
                __dirname: 'readonly',
                __filename: 'readonly',
                Buffer: 'readonly',
                clearImmediate: 'readonly',
                clearInterval: 'readonly',
                clearTimeout: 'readonly',
                console: 'readonly',
                exports: 'writable',
                global: 'readonly',
                module: 'writable',
                process: 'readonly',
                queueMicrotask: 'readonly',
                require: 'readonly',
                setImmediate: 'readonly',
                setInterval: 'readonly',
                setTimeout: 'readonly',
            },
        },
        rules: {
            'no-console': 'error',
        },
    },
]
