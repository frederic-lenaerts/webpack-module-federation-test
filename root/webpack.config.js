const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require("path");

const rules = [
	{
		test: /\.jsx?$/,
		include: path.resolve(__dirname, "src"),
		use: {
			loader: "babel-loader",
			options: {
				presets: ["@babel/react"]
			}
		}
	}
];

const optimization = {
	chunkIds: "named", // for this example only: readable filenames in production too
	nodeEnv: "production" // for this example only: always production version of react
};

const stats = {
	chunks: true,
	modules: false,
	chunkModules: true,
	chunkOrigins: true
};

module.exports = {
    name: "app",
    mode: "development",
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name].js",

        // Each build needs a unique name
        // to avoid runtime collisions
        // The default uses "name" from package.json
        uniqueName: "federation-root"
    },
    module: { rules },
    optimization,
    plugins: [
        new ModuleFederationPlugin({
            // List of remotes with URLs
            remotes: {
                "module-a": "moduleA@http://localhost:5001/moduleA.js",
                "module-b": "moduleB@http://localhost:5002/moduleB.js"
            },

            // list of shared modules with optional options
            shared: {
                // specifying a module request as shared module
                // will provide all used modules matching this name (version from package.json)
                // and consume shared modules in the version specified in dependencies from package.json
                // (or in dev/peer/optionalDependencies)
                // So it use the highest available version of this package matching the version requirement
                // from package.json, while providing it's own version to others.
                react: {
                    singleton: true // make sure only a single react module is used
                }
            }
        }),
        new HtmlWebpackPlugin()
    ],
    stats
}