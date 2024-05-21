module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    overrides: [
        {
            files: ["*.js"],
            extends: ["prettier"],
        },
        {
            files: ["*.ts"],
            extends: ["love", "prettier"],
        },
    ],
}
