module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@appjson": "./app.json",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@styles": "./src/styles",
            "@navigators": "./src/navigators",
            "@services": "./src/services",
            "@images": "./assets/images",
            "@apis": "./src/apis",
            "@fonts": "./assets/fonts",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
