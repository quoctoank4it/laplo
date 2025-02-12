const { override, addWebpackPlugin } = require("customize-cra");
const WebpackObfuscator = require("webpack-obfuscator");

module.exports = override(
  addWebpackPlugin(
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
    })
  )
);
