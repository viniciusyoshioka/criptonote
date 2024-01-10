module.exports = {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["."],
                extensions: [".js", ".ts", ".tsx", ".json"],
                alias: {
                    "@components": "./src/components",
                    "@database": "./src/database",
                    "@hooks": "./src/hooks",
                    "@locales": "./src/locales",
                    "@router": "./src/router",
                    "@screen": "./src/screen",
                    "@services": "./src/services",
                    "@theme": "./src/theme",
                },
            }
        ],
        ["@babel/plugin-proposal-decorators", { legacy: true } ],
        "@realm/babel-plugin",
        "react-native-reanimated/plugin",
    ],
    env: {
        production: {
            plugins: ["react-native-paper/babel"],
        },
    },
}
