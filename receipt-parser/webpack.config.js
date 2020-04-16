module.exports = {
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
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, loader: "sass-loader" },  // to convert SASS to CSS
            { enforce: 'pre', test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
        ],
    },
};