var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
	target: "node",
    entry: "./src/index.js",	
    output: {
        filename: "./public/bundle.js",
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
    },
    module: {
        loaders: [
            // Handle .ts and .tsx file via ts-loader.
			{ test: /\.json$/, loader: 'json-loader' }
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, loader: "sass-loader" },  // to convert SASS to CSS
            { enforce: 'pre', test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
        ],
    },
	node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',

  }
};