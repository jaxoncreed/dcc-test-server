// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");

module.exports = {
  entry: "./dist/customFunctions.js",
  output: {
    filename: `../bundle/bundle.js`,
    libraryTarget: "umd",
    library: "EntryPoint",
  },
  target: "node",
  mode: "production",
  // optional: bundle everything into 1 file
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  externals: {
    "rdf-canonize-native": "rdf-canonize-native",
  },
};
