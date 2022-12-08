const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");
const webpack = require("webpack");

const themeNames = fs
  .readdirSync("./src/style/theme")
  .filter((item) => fs.lstatSync("./src/style/theme/" + item).isDirectory());

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/theme/index.scss";`,
      },
    },
  },
  configureWebpack: (config) => {
    return {
      plugins: [
        // 自定义webpack插件
        new webpack.DefinePlugin({
          THEME_NAMES: JSON.stringify(themeNames),
        }),
      ],
    };
  },
});
