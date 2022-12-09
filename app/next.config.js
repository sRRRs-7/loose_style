module.exports = {
    output: 'standalone',
    experimental: {
        forceSwcTransforms: true,
        externalDir: true | {
            enabled: true,
            silent: true,
        },
    },
};