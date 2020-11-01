const path = require("path");

const resolve = dir => path.resolve(__dirname, dir);

module.exports = function (config, env) {
    config.resolve.alias = Object.assign(config.resolve.alias, {
        "@screens": resolve("./src/screens/"),
        "@components": resolve("./src/components/"),
        "@constants": resolve("./src/constants/"),
        "@styles": resolve("./src/styles/"),
        "@action": resolve("./src/redux/actions"),
        "@src": resolve("./src/")
        // etc...
    });
    return config;
};